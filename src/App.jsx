import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {BrowserRouter, Routes, Router, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Chat from './components/Chat'
import User from './components/User'
import AddUser from './components/AddUser'
import Profile from './components/profile'
import FooterNav from './components/FooterNav'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/chat' element={<Chat />} />
      <Route path='/user' element={<User />} />
      <Route path='/add' element={<AddUser />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
    <FooterNav /> 
    </BrowserRouter>
   
  )
}

export default App
