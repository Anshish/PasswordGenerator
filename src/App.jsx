import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length,setLength]=useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [charactersAllowed,setCharactersAllowed]=useState(false)
  const [password,setPassword]=useState('')

  const passwordRef=useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let string="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed){
      string+="0123456789"
    }
    if(charactersAllowed){
      string+='!@#$%^&*-_+=[]{}~`'
    }

    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*string.length+1)
      pass+=string.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,charactersAllowed])

  const copyPassword=useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charactersAllowed,passwordGenerator])

  return (
    <>
      <div className='outer-container'>
        <div className='container'>
          <h1>Password Generator</h1>

          <div className='above'>
            <input 
            type="text" 
            value={password} 
            className='input' 
            placeholder='Password' 
            readOnly
            ref={passwordRef} />
            <button className='button' onClick={copyPassword}>Copy</button>
          </div>

          <div className='below'>
            <div>
              <input 
              type="range" 
              min={8} 
              max={50} 
              value={length}
              className='range'
              onChange={(e)=>{setLength(e.target.value)}} />
              <label className='labels'>Length: {length}</label>
            </div>

            <div>
              <input 
              type="checkbox" 
              defaultChecked={numberAllowed} 
              className='checkbox' 
              id='numberInput' 
              onChange={()=>{
                setNumberAllowed(prev=>!prev)}
              } />
              <label className='labels' htmlFor='numberInput'>Numbers</label>
            </div>

            <div>
              <input 
                type="checkbox" 
                defaultChecked={charactersAllowed} 
                className='checkbox' 
                id='characterInput' 
                onChange={()=>{
                  setCharactersAllowed(prev=>!prev)}
                } />
                <label className='labels' htmlFor='characterInput'>Characters</label>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
