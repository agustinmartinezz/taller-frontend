import React from 'react'
import { useNavigate,Link } from 'react-router-dom';



const Home = () => {
  const navigate = useNavigate();

  if(!localStorage.getItem("apiKey")){
    navigate("/login");
  }
  
  return (
    <div className='text-center homeContainer'>
      <h1>Bienvenido a Censo 2023!</h1>
    </div>
  )
}

export default Home