import './App.css'
import Navbar from './components/Navbar'
import { Route ,Routes} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'


function App() {

  return (
    <>
    <Navbar></Navbar>
    <Routes>
       <Route path='/'></Route>
       <Route path='/Register' element={<Register></Register>}></Route>
       <Route path='/Login' element={<Login></Login>}></Route>
       <Route path='/Profile' element={<Profile></Profile>}></Route>
    </Routes>
       
    </>
  )
}

export default App
