import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  useEffect(()=>{
    name()
  },[]);

  async function name() {
    const url = "https://jsonplaceholder.typicode.com/users";
    let response  = await fetch(url);
    const res =   await response.json();
    console.log("first name :",res[0].name);
    res.map((m)=>{
      console.log("name = ",m.name);
    })
  }


  return (
    <>
       
    </>
  )
}

export default App
