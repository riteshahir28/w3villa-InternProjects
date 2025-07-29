import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components2.jsx/Home.jsx';
import About from './components2.jsx/About.jsx';
import Contact from './components2.jsx/Contact.jsx';
import Navbar from './components/Navbar.jsx';
import { UserName } from './components/CreateContaxt.jsx';
import { BrowserRouter , Routes ,Route} from 'react-router-dom';
import Newuser from './components2.jsx/Newuser.jsx';

function App() {
 const [loggedUser , setUser] = useState(["default","default@gmail.com"]);
  return (
    <>
    <UserName.Provider value={{loggedUser , setUser}}>
        <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<Home username={loggedUser[0]} useremail={loggedUser[1]} setUserName={setUser}></Home>}></Route>
            <Route path='/about' element={<About username={loggedUser[0]} useremail={loggedUser[1]} setUserName={setUser}></About>}></Route>
            <Route path='/contact' element={<Contact username={loggedUser[0]} useremail={loggedUser[1]} setUserName={setUser}></Contact>}></Route>
            <Route path='/new' element={<Newuser username={loggedUser[0]} useremail={loggedUser[1]} setUserName={setUser}></Newuser>} ></Route>
          </Routes>
        </BrowserRouter>
        </UserName.Provider >
    </>
  )
}

export default App
