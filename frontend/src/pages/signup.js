import { useState, useEffect } from "react"

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const [frontImg, setFrontImg] = useState('')
    const [bckImg, setBckImg] = useState('')
    const [send, setSend] = useState(0)
    const [trig, setTrig] = useState(0)
    const [error, setError] = useState('')
    const [errorImg, setErrorImg] = useState('')
    const [errorImg2, setErrorImg2] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const showPass = () => {
        if(show === false) {
            setShow(true)
        }
        if(show) {
            setShow(false)
        }
    }

    const handle = (e) => {
        const reader = new FileReader()
        const imgType = e.target.files[0] !== undefined && e.target.files[0].type.split('/')[1]
        try {
            if(imgType === 'png' || imgType === 'jpg' || imgType === 'jpeg' || imgType === 'jfif' || e.target.files[0] === undefined) {
                reader.readAsDataURL(e.target.files[0])
                setErrorImg('')
            }
            else {
                setFrontImg('')
                setErrorImg('ID (Front) is not an Image')
            }
            
        }catch(error) {
            setFrontImg('')
        }
        
        reader.onload = () => {
            setFrontImg(reader.result) //base64encoded
        }
            reader.onerror = error => {
        }
    }

    const handle2 = (e) => {
        const reader2 = new FileReader()
        const imgType = e.target.files[0] !== undefined && e.target.files[0].type.split('/')[1]
        
        try {
            if(imgType === 'png' || imgType === 'jpg' || imgType === 'jpeg' || imgType === 'jfif' || e.target.files[0] === undefined) {
                reader2.readAsDataURL(e.target.files[0])
                setErrorImg2('')
            }
            else {
                setBckImg('')
                setErrorImg2('ID (Back) is not an Image')
            }
        }catch(error) {
            setBckImg('')
            setErrorImg2('')
        }
        
        reader2.onload = () => {
            setBckImg(reader2.result) //base64encoded
        }
            reader2.onerror = error => {
        }
    }

    useEffect(() => {
        const signUpReqSend = async () => {
            setIsLoading(true)
            const response = await fetch('https://read-online-library.onrender.com/api/user/signup', {
                method: 'POST',
                body: JSON.stringify({email, password, base1: frontImg, base2: bckImg}),
                headers: {'Content-Type': 'application/json'} 
            })
    
            const json = await response.json()
           
            if(!response.ok){
                setError(json.error)
                setIsLoading(false)
            }
            if(response.ok) {
                setPassword('')
                setFrontImg('')
                setBckImg('')
                setSend(0)
                setTrig(1)
                setError(null)
                setIsLoading(false)
            }
        }

        const sndEmail = async () => {
            const message = 'Wait for atleast an hour before your account is approved. Thank you' 
            const sendEmail = await fetch('https://read-online-library.onrender.com/api/user/sendEmail', {
                method: 'POST',
                body: JSON.stringify({email, message}),
                headers: {'Content-Type': 'application/json'} 
            })
            
            if (sendEmail.ok) {
                setEmail('')
            }
        }

        if (send !== 0) {
            signUpReqSend()
        }

        if(trig === 1) {
            sndEmail()
            setTrig(0)
        } 
    }, [send])

    const frImg = {
        backgroundImage : `url(${frontImg})`,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backgroundSize: 'cover',
        border: '2px solid black',
        borderRadius: '10px',
        width: '100%',
        fontSize: '20px',
        color: '#fff',
        textAlign: 'center'
    }

    const frImgDes = {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: `${frontImg === '' ? '20%' : '10%'}`,
        padding: '5px'
    }

    const bcImg = {
        backgroundImage : `url(${bckImg})`,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backgroundSize: 'cover',
        border: '2px solid black',
        borderRadius: '10px',
        width: '100%',
        fontSize: '20px',
        color: '#fff',
        textAlign: 'center'
    }

    const bcImgDes = {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: `${bckImg === '' ? '20%' : '10%'}`,
        padding: '5px'
    }

    return(
        <div id='signuppage'>
            <div id='bgsignup'></div>
            <div id="blurdiv2"></div>
            <div id="formdiv2">
                <div style={frImg}><div style={frImgDes}>Front</div>{frontImg === '' && <div>No Front ID</div>}</div>
                <form id="formsignup" onSubmit={(e) => e.preventDefault()}>
                    <label className="bigLabel">SIGN UP </label><br/>
                    <label>Email: </label>
                    <input 
                    type='email'
                    className={`${(error && email === '') && 'error'}`}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    placeholder="@gmail.com"
                    value={email}/><br/>
                    <label>Password: </label>
                    <input 
                    type={show ? 'text' : 'password'}
                    className={`${(error && password === '') && 'error'}`}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    placeholder="password"
                    value={password}/><br/>
                    <div className="passTog"><input type="checkbox" disabled={isLoading} onChange={showPass}/> Show Password</div><br/>
                    <label>ID (Front): </label>
                    <input 
                    type='file' 
                    className={`${((error && frontImg === '') || errorImg) && 'error'}`}
                    onChange={handle}
                    disabled={isLoading}
                    accept="image/*"/><br/>
                    {errorImg && <div className={`${errorImg && 'error'}`}>{errorImg}</div>}
                    <label>ID (Back): </label>
                    <input 
                    type='file'
                    className={`${((error && bckImg === '') || errorImg2) && 'error'}`}
                    onChange={handle2}
                    disabled={isLoading}
                    accept="image/*"/><br/>
                    {errorImg2 && <div className={`${errorImg2 && 'error'}`}>{errorImg2}</div>}
                    {isLoading === false && <button className="btnForm" onClick={() => setSend((e) => e + 1)}>Submit</button>}
                    {isLoading && <div className="loadingForm"><span></span></div>}
                    {(((error === 'Account is already existing' || error === 'User is not yet approved by the admin' 
                    || error === 'Account is already pending') && (email === '' || password === '' || frontImg === '' || bckImg === '')) || (error
                    && isLoading === false)) 
                    && <div className="error">{error}</div>}
                </form>
                <div style={bcImg}><div style={bcImgDes}>Back</div>{bckImg === '' && <div>No Back ID</div>}</div>
            </div> 
        </div>
    )
}

export default Signup