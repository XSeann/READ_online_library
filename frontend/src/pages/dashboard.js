import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {Document, Page} from 'react-pdf'

const Dashboard = () => {
    const [allUSers, setAllUsers] = useState([])
    const [allPdf, setAllPdf] = useState([])
    const [delId, setDelId] = useState('')
    const [delIdCh, setDelIdCh] = useState('')
    const [upId, setUpId] = useState('')
    const [upIdCh, setUpIdCh] = useState('')
    const [delPdf, setDelPdf] = useState('')
    const [delPdfCh, setDelPdfCh] = useState('')
    const [upPdf, setUpPdf] = useState('')
    const [upPdfCh, setUpPdfCh] = useState('')
    const [stateUser, setStateUser] = useState('')
    const [statePdf, setStatePdf] = useState('')

    useEffect(() => {
        const getUsers = async () => {
            const response = await fetch('https://read-online-library.onrender.com/api/user/users')
            const json = await response.json()
    
            setAllUsers(json)
            setStateUser('')
        }
        
        getUsers()
    
    }, [stateUser])

    useEffect(() => {
        const getPdf = async () => {
            const response = await fetch('https://read-online-library.onrender.com/api/file')
            const json = await response.json()
            setAllPdf(json)
            setStatePdf('')
        }
        
        getPdf()
    
    }, [statePdf])

    useEffect(() => {
        let email = ''

        for (let i = 0; i < allUSers.length; i++) {
            if(allUSers[i]._id === upId) {
                email = allUSers[i].email
            }
        }
       
        const approveSignUpReq = async () => {
            const approved = true
            const image = ''
            const image2 = ''
            const message = 'Your Account has been approved. Thank you for your patience' 

            const response = await fetch(`https://read-online-library.onrender.com/api/user/${upIdCh}`,{
                method: 'PATCH',
                body: JSON.stringify({approved, image, image2}),
                headers: {'Content-Type': 'application/json'}
            })
    
            const json = await response.json()
    
            if (response.ok) {
                setStateUser(json._id)
            }
    
            if (!response.ok) {
                console.log('error')
            }

            const sendEmail = await fetch('https://read-online-library.onrender.com/api/user/sendEmail', {
                method: 'POST',
                body: JSON.stringify({email, message}),
                headers: {'Content-Type': 'application/json'} 
            })

            if (sendEmail.ok) { 
                email = ''
            }
        }

        if(upId !== '' && email !== '') {
            approveSignUpReq()
        }
        
    }, [upIdCh])

    useEffect(() => {
        
        const deleteSignUpReq = async () => {
            const response = await fetch(`https://read-online-library.onrender.com/api/user/${delIdCh}`, {
                method: 'DELETE'
            })
    
            const json = await response.json()
    
            if (response.ok) {
                setStateUser(json._id)
            }
    
            if (!response.ok) {
                console.log('error')
            }
        }

        if (delId !== '') {
            deleteSignUpReq()
        }
        
    }, [delIdCh])

    useEffect(() => {
        
        const approved = true
        const ApprovePdf = async () => {
            const response = await fetch(`https://read-online-library.onrender.com/api/file/${upPdfCh}`,{
                method: 'PATCH',
                body: JSON.stringify({approved}),
                headers: {'Content-Type': 'application/json'}
            })

            const json = await response.json()
    
            if (response.ok) {
                setStatePdf(json._id)
            }
    
            if (!response.ok) {
                console.log('error')
            }
        }

        if(upPdf !== '') {
            ApprovePdf()
            setUpPdf('')
        }

    }, [upPdfCh])

    useEffect(() => {
        const deletePdf = async () => {
            const response = await fetch(`https://read-online-library.onrender.com/api/file/${delPdfCh}`, {
                method: 'DELETE'
            })
            
            const json = await response.json()
    
            if (response.ok) {
                setStatePdf(json._id)
            }
    
            if (!response.ok) {
                console.log('error')
            }
        }

        if (delPdf !== '') {
            deletePdf()
            setDelPdf('')
        }
    }, [delPdfCh])

    return(
        <div id="dashboardCon">
            <div className="dashbSmall">
                <b>ACCOUNT REQUEST</b>
                {allUSers.length === 0 && <div className="loading">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>}
                {allUSers.length > 0 && allUSers.map(data => 
                (data.approved === false && <div key={data._id}>
                    <p>Email: {data.email}</p>
                    <div id="IDConfirm">
                        <p>ID (Front): </p>
                        <img src={data.image} width={100}/> 
                        <p>ID (Back): </p>
                        <img src={data.image2} width={100}/>
                    </div>
                    {(delId !== data._id && upId !== data._id) && <div className="dashBMainButtons">
                        <button className="appr" onClick={e => setUpId(e.target.value)} value={data._id}>Approve Request</button>
                        <button className="del" onClick={e => setDelId(e.target.value)} value={data._id}>Reject Request</button>
                    </div>}
                    {upId === data._id && <p className="warning">Warning: Are you sure you want to APPROVE this Account?</p>}
                    <div className="dashBConButtons">
                        {upId === data._id && <button className="yes" onClick={e => setUpIdCh(e.target.value)} value={data._id}>Yes</button>}
                        {upId === data._id && <button className="no" onClick={() => setUpId('')}>No</button>}
                    </div>
                    {delId === data._id && <p className="warning">Warning: Are you sure you want to REJECT this Account?</p>}
                    <div className="dashBConButtons">
                        {delId === data._id && <button className="yes" onClick={e => setDelIdCh(e.target.value)} value={data._id}>Yes</button>}
                        {delId === data._id && <button className="no" onClick={() => setDelId('')}>No</button>}
                    </div>
                    
                </div>))}
            </div>
            <div className="dashbSmall">
                <b>PDF REQUEST</b>
                {allPdf.length === 0 && <div className="loading">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>}
                {allPdf.length > 0 && allPdf.map(data => 
                (data.approved === false && <div key={data._id}>
                    <Link to={`/pdfView/${data._id}`}>{data.title}</Link>
                    {(delPdf !== data._id && upPdf !== data._id) && <div className="dashBMainButtons">
                        <button className="appr" onClick={e => setUpPdf(e.target.value)} value={data._id}>Approve Pdf</button>
                        <button className="del" onClick={e => setDelPdf(e.target.value)} value={data._id}>Reject Pdf</button>
                    </div>}
                    {upPdf === data._id && <p className="warning">Warning: Are you sure you want to APPROVE this Pdf?</p>}
                    <div className="dashBConButtons">
                        {upPdf === data._id && <button className="yes" onClick={e => setUpPdfCh(e.target.value)} value={data._id}>Yes</button>}
                        {upPdf === data._id && <button className="no" onClick={() => setUpPdf('')}>No</button>}
                    </div>
                    {delPdf === data._id && <p className="warning">Warning: Are you sure you want to REJECT this Pdf?</p>}
                    <div className="dashBConButtons">
                        {delPdf === data._id && <button className="yes" onClick={e => setDelPdfCh(e.target.value)} value={data._id}>Yes</button>}
                        {delPdf === data._id && <button className="no" onClick={() => setDelPdf('')}>No</button>}
                    </div>
                </div>))}
            </div>
            <div className="dashbSmall">
                <b>EXISTING ACCOUNTS </b>   
                {allUSers.length === 0 && <div className="loading">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>}
                {allUSers.length > 0 && allUSers.map(data => 
                ((data.approved && data.is_admin === false) && <div key={data._id}>
                    <p>{data.email}</p>
                    {delId !== data._id && <div className="dashBMainButtonsDel"><button className="del" onClick={e => setDelId(e.target.value)} value={data._id}>Delete Account</button></div>}
                    {delId === data._id && <p className="warning">Warning: Are you sure you want to DELETE this Account?</p>}
                    <div className="dashBConButtons">
                        {delId === data._id && <button className="yes" onClick={e => setDelIdCh(e.target.value)} value={data._id}>Yes</button>}
                        {delId === data._id && <button className="no" onClick={e => setDelId('')}>No</button>}
                    </div>
                </div>))}
            </div>
            <div className="dashbSmall">
                <b>APPROVED PDF</b>
                {allPdf.length === 0 && <div className="loading">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>}
                {allPdf.length > 0 && allPdf.map(data => 
                (data.approved && <div key={data._id}>
                    <Link to={`/pdfView/${data._id}`}>{data.title}</Link>
                    {delPdf !== data._id && <div className="dashBMainButtonsDel"><button className="del" onClick={e => setDelPdf(e.target.value)} value={data._id}>Delete Pdf</button></div>}
                    {delPdf === data._id && <p className="warning">Warning: Are you sure you want to DELETE this Pdf?</p>}
                    <div className="dashBConButtons">
                        {delPdf === data._id && <button className="yes" onClick={e => setDelPdfCh(e.target.value)} value={data._id}>Yes</button>}
                        {delPdf === data._id && <button className="no" onClick={() => setDelPdf('')}>No</button>}
                    </div>
                </div>))}
            </div>
        </div>
    )
}

export default Dashboard