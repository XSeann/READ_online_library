import React, {useState} from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5'
import 'react-pdf/dist/esm/Page/TextLayer.css'

const UploadPdf = () => {
    const [title, setTitle] = useState('')
    const [file, setFile] = useState('')
    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [error, setError] = useState([])
    const [errorPdf, setErrorPdf] = useState('')
    const [section, setSec] = useState('ICT')
    const [author, setAuthors] = useState('')
    const [num, setNum] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    let authors = author.split('\n').toString()
    let arrSec = ["ICT", "HUMMS", "ABM", "STEM", "CA", "TO"]

    const submitPdf = (e) => {
        const er = e.target.files[0] 
        const reader = new FileReader()
        const pdfChecker = er !== undefined && er.type.split('/')[1]
        const sizeChecker = er !== undefined && Math.floor(er.size / 1000)
        let errArr = []
        try {
            
            if(pdfChecker !== 'pdf') {
                errArr.push('This is not a pdf')
            }
            if(sizeChecker > 10000) {
                errArr.push('This file size is too large: Only 10 mb below is allowed.')
            }
            
            if((pdfChecker === 'pdf' || e.target.files[0] === undefined) && sizeChecker < 10000) {
                reader.readAsDataURL(e.target.files[0])
                setError(error.filter(w => w !== 'file'))
                setErrorPdf('')
            }
            else {
                setFile('')
                setErrorPdf(errArr.length === 2 ? errArr.toString().replace(',', ' and ') : errArr)
            }
            
        }catch(error) {
            setFile('')
        }
        
        reader.onload = () => {
            setFile(reader.result) //base64encoded
        }
        reader.onerror = error => {
        }
    }

    const uploadFile = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const response = await fetch('https://read-online-library.onrender.com/api/file', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title, authors, section, pdf: file})
        }) 
        
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setIsLoading(false)
        }

        if (response.ok) {
            setTitle('')
            setAuthors('')
            setSec('ICT')
            setFile('')
            setError([])
            setNum(0)
            setIsLoading(false)
        }
    }

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages)
        setPageNumber(1)
    }
    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage(e) {
        e.preventDefault()
        changePage(-1);
    }

    function nextPage(e) {
        e.preventDefault()
        changePage(1);
    }
    
    const pdfStyle = {
        userSelect: 'none'
    }

    const prevSec = (e) => {
        e.preventDefault()
        if (num > 0) {
            setNum(e => e - 1)
            setSec(arrSec[num - 1])
        }
    }

    const nextSec = (e) => {
        e.preventDefault()
        if (num < arrSec.length - 1){
            setNum(e => e + 1) 
            setSec(arrSec[num + 1])
        }    
    }

    return (
        <div id='uploadPdf'>
                <div id='bgupPdf'></div>
                <div id='upPdfblur'></div>
                <div id='formdiv3'>
                <div id='docuCon'>
                    PDF PREVIEW
                    {file === '' || file === null || error.includes('file') ? '' : 
                    <div id='document'>
                        <div id='docuPdf' style={pdfStyle}>
                            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                                <Page id={'page'} pageNumber={pageNumber}/>
                            </Document>
                        </div>
                        <div id='pdfButtons'>
                            <button
                                type="button"
                                disabled={pageNumber <= 1}
                                onClick={previousPage}
                            >
                                Prev
                            </button>
                            <p>
                                Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                            </p>
                            <button
                                type="button"
                                disabled={pageNumber >= numPages}
                                onClick={nextPage}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                    }
                </div>
                
                <form id="formUpPdf" onSubmit={uploadFile}>
                    <label>Title:</label>
                    <input
                    className={error.includes('title') && title === '' ? 'error' : ''}
                    type='text'
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isLoading}
                    value={title}
                    />

                    <label>Authors:</label> 

                    <textarea className={error.includes('authors') && author === '' ? 'error' : ''} onChange={e => setAuthors(e.target.value)}
                    disabled={isLoading} value={author}/>
                    
                    <label>Section:</label>
                    <div id='section'>
                        <button onClick={prevSec} disabled={isLoading}>Prev</button>
                        <strong><span>{arrSec[num]}</span></strong>
                        <button onClick={nextSec} disabled={isLoading}>Next</button>
                    </div>

                    <label>File of Thesis:</label>
                    <input 
                    className={(error.includes('file') && file === '' || errorPdf) ? 'error' : ''}
                    type='file'
                    accept='.pdf'
                    disabled={isLoading}
                    onChange={submitPdf}
                    />
                    {(errorPdf && isLoading === false) && <div className={`${errorPdf && 'error'}`}>{errorPdf}</div>}
                    {isLoading === false &&<button>Upload</button>}
                    {isLoading && <div className="loadingForm"><span></span></div>}
                    {(error.length !== 0 && isLoading === false) && <div className='error'>{'Please fill the following: ' + error.toString().replace(/,/ig, ',')}</div>}
                </form>
                </div>
        </div>
    )

}

export default UploadPdf