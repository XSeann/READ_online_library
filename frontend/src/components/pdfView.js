import React, {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import {Document, Page, pdfjs} from 'react-pdf'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';


const PdfView = () => {
    const [oneFile, setOneFile] = useState('')
    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const id = useParams()

    useEffect(() => {
        const getOneData = async () => {
            const response = await fetch(`https://read-online-library.onrender.com/api/file/${id.id}`)
            const json = await response.json()
            setOneFile(json)
        }
        getOneData()
    }, [id.id])
    
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
        overflow: 'hidden',
        userSelect: 'none'
    }

    return(
        <div id="onePdf">
            
            <div id='btn'>
                <button
                    type="button"
                    disabled={pageNumber <= 1}
                    onClick={previousPage}
                >
                    Previous
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
            
            <div className="docuOnePdf" style={pdfStyle}>
                <Document file={oneFile.file} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber}/>
                </Document>
            </div>
            {oneFile !== '' && <div id="refCita">
                <p><strong>Reference:</strong> {oneFile.authors.split(',').length < 3 ? oneFile.authors.replace(',', ' & ') : 
                oneFile.authors.split(',')[0] + ' et.al'} ({oneFile.createdAt.split('-')[0]}). {oneFile.title}. {oneFile._id}</p>
                <p><strong>Narrative Citation:</strong> {oneFile.authors.split(',').length < 3 ? oneFile.authors.replace(',', ' & ') : 
                oneFile.authors.split(',')[0] + ' et.al'} ({oneFile.createdAt.split('-')[0]})</p>
                <p><strong>Parenthetical Citation:</strong> ({oneFile.authors.split(',').length < 3 ? oneFile.authors.replace(',', ' & ') : 
                oneFile.authors.split(',')[0] + ' et.al'}, {oneFile.createdAt.split('-')[0]})</p>
            </div>}
        </div>
    )
}

export default PdfView