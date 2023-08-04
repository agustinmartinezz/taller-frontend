import React from 'react'
import Personas from './Personas'
import { useNavigate,Link } from 'react-router-dom';
import AgregarPersona from './AgregarPersona'
import TiempoRestante from './TiempoRestante'
import '../styles/Dashboard.css'
import ChartReports from './ChartReports';
import PorcentajeCensados from './PorcentajeCensados';
import Mapa from './Mapa';

const Dashboard = () => {
  const navigate = useNavigate();

  if(!localStorage.getItem("apiKey")){
    navigate("/login");
  }
  
  return (
    <div className='container dash'>
      <h2>Dashboard</h2>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          </div>
        </div>
        <ChartReports/>
        <Personas />
        <AgregarPersona />
        <PorcentajeCensados />
        <TiempoRestante />
        <Mapa />
      </div>
    </div>
  )
}

export default Dashboard