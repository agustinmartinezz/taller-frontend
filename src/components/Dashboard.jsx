import React from 'react'
import Personas from './Personas'
import { useNavigate,Link } from 'react-router-dom';
import AgregarPersona from './AgregarPersona'
import TiempoRestante from './TiempoRestante'

const Dashboard = () => {
  const navigate = useNavigate();

  if(!localStorage.getItem("apiKey")){
    navigate("/login");
  }
  
  return (
    <div className='container'>
      <h2>Dashboard</h2>
      <Personas />
      <AgregarPersona />
      <TiempoRestante />
    </div>
  )
}

export default Dashboard