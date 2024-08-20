import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Chat from './pages/chat/Chat'
import ProfileUpdate from './pages/profileUpdate/ProfileUpdate'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'

const App = () => {

  // useEffect(()=>{
  //   onAuthStateChanged(auth,)
  // },[])

  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/chat' element={<Chat />}/>
        <Route path='/profile-update' element={<ProfileUpdate />}/>
      </Routes>
    </>
  )
}

export default App