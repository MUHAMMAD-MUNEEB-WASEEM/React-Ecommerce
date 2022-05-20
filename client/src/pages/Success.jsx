import React from 'react'
import { useLocation } from 'react-router-dom'

function Success() {

  const location = useLocation();

  console.log(location)


  return (
    <div
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <button style={{ padding: 10, marginTop: 20, backgroundColor:"teal", color: "white"}}>Successful</button>
  </div>
  )
}

export default Success