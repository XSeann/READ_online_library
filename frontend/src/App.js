import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

import { useAuthContext } from './hooks/useAuthContext'

import Nav from "./components/nav"
import StartPage from "./components/startPage"
import PdfView from "./components/pdfView"

import Login from "./pages/login"
import Signup from "./pages/signup"
import Home from "./pages/home"
import Dashboard from "./pages/dashboard"
import UploadPdf from "./pages/uploadPdf"

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/" element={!user ? <StartPage/> : <Navigate to='/home'/>}/>
          <Route path="/login" element={!user ? <Login/> : <Navigate to='/home'/>}/>
          <Route path="/signupForm" element={!user && <Signup/>}/>
          <Route path="/home" element={user ? <Home/> : <Navigate to='/'/>}/>
          <Route path="/dashboard" element={user ? <Dashboard/> : <Navigate to='/'/>}/>
          <Route path="/uploadPdf" element={user ? <UploadPdf/> : <Navigate to='/'/>}/>
          <Route path='/pdfView/:id' element={user ? <PdfView/> : <Navigate to='/'/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
