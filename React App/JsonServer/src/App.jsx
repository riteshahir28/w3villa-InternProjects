import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserList from './UserList.jsx'
import UserAdd from './UserAdd.jsx' 
import DeleteUser from './DeleteUser.jsx'
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router'
import Navbar from './HeaderComponent/Navbar.jsx'
import UpdateAll from './UpdateAll.jsx'
 
 
function App() {
  return(
     <>
     <Navbar></Navbar>
      <Routes>
            <Route path="/alluser" element={<UserList></UserList>}></Route>
            <Route path="/adduser" element={<UserAdd></UserAdd>}></Route>
            <Route path="/updateuser" element={<UpdateAll></UpdateAll>}></Route>
            <Route path="/deleteuser" element={<DeleteUser></DeleteUser>}></Route>
            <Route path="/" element={<UserList></UserList>}></Route>
        </Routes>
     </>
  )
  
}

export default App
