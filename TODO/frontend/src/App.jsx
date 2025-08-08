import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SetData from './module/SetData'
import GetData from './module/GetData'
import Navbar from './module/Navbar'
import { Routes ,Route } from 'react-router-dom'
import DeleteData from './module/DeleteData'


function App() {
  const [count, setCount] = useState(0)

  const data = {
    "title":"todo 1",
    "name":"ritesh yadav"
  };


  return (
    <>
    <Navbar></Navbar>
      <Routes>
            <Route path="/alluser" element={<GetData></GetData>}></Route>
            <Route path="/adduser" element={<SetData></SetData>}></Route>
            <Route path="/deleteuser" element={<DeleteData></DeleteData>}></Route>
            <Route path="/" element={<GetData></GetData>}></Route>
        </Routes>

       {/* <div>
        <button onClick={pData}>Click me</button>
       </div> */}
    </>
  )
}

export default App
