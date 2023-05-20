import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        await login(email, password)
    }

    const showPass = () => {
        if(show === false) {
            setShow(true)
        }
        if(show) {
            setShow(false)
        }
    }

    return(
        <div id='loginpage'>
            <div id='bglogin'></div>
            <div id="blurdiv"></div>
            <div id='formdiv'>
                <form id="formlogin" onSubmit={handleSubmit}>
                    <label className="bigLabel">LOG IN </label><br/>
                    <label>Email: </label>
                    <input 
                    type='email'
                    name="email"
                    id="email"
                    className={`${(error && email === '') && 'error'}`}
                    disabled={isLoading}
                    onChange={e => setEmail(e.target.value)}
                    /><br/>
                    <label>Password: </label>
                    <input type={show ? 'text' : 'password'} 
                    id="password" 
                    name="password"
                    className={`${(error && password === '') && 'error'}`}
                    disabled={isLoading}
                    onChange={e => setPassword(e.target.value)} /><br/>
                    <div className="passTog"><input type="checkbox" disabled={isLoading} onChange={showPass}/> Show Password</div><br/>
                    {(isLoading === null || isLoading === false) && <button className="btnForm">Log In</button>}
                    {isLoading && <div className="loadingForm"><span></span></div>}
                    {(error === 'All fields must be filled' && (email === '' || password === '') || error) && <div className="error">{error}</div>}
                </form>
            </div>
        </div>

    )
}//

export default Login