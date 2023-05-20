import {Link} from 'react-router-dom'

import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

const Nav = () => {
    const {user} = useAuthContext()
    const {logout} = useLogout() 
    
    const handleClick = () => {
        logout()
    }

    const navStyle = {gridTemplateColumns : 'auto auto auto auto auto auto auto auto auto'}

    const navNone = {}

    return(
        <div id='nav' style={!user ? navNone : navStyle}>
            <div className='logo'><Link to='/'><h2 className='logoname'>READ</h2></Link></div>
            <div className='gap'></div>
            {!user && <Link to='/login' className='login'>Log In</Link>}
            {!user && <Link to='/signupForm' className='signup'>Sign Up</Link>}
            {user && <Link to='/home' className='home'>Home</Link>}
            {user && user.is_admin && <Link to='/dashboard' className='dashboard'>Dashboard</Link>}
            {user && !user.is_admin && <Link to='/uploadPdf' className='uploadPdf'>Upload a Pdf</Link>}
            {user && <Link className='logout' onClick={handleClick}>Log Out</Link>}
        </div>
    )
}
//
export default Nav