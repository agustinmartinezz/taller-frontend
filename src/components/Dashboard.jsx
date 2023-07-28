import React from 'react'
import Personas from './Personas'
import { useNavigate,Link } from 'react-router-dom';
import AgregarPersona from './AgregarPersona'

const Dashboard = () => {
  const navigate = useNavigate();

  if(!localStorage.getItem("apiKey")){
    navigate("/login");
  }
  
  return (
    <div>
      <h2>Dashboard</h2>
      <Personas />
      <AgregarPersona />
    </div>
  )
}

export default Dashboard