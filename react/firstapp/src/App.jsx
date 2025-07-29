import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
 import { count } from './Context.jsx'
 import Counter from './Counter.jsx'
 import Btn from './Btn.jsx'
function App() {
 
const [stateCount , setCount] = useState(0);

  return (
    <>
     <count.Provider value={{stateCount,setCount}}>
      <Btn counting={stateCount} setCounting={setCount}></Btn>
        <Counter counting={stateCount}></Counter>
       
     </count.Provider>
        
    </>
  )
}

export default App
