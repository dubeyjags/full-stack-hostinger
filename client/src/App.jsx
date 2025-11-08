import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch('http://localhost:4000/api/message')
      .then((response) => response.json())
      .then((data) => {
        setData(data.message)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  return (
    <>
     <h1>Hello Full stack deployment! </h1>
    <h4>Data: {data}</h4>
    </>
  )
}


export default App
