import React from 'react'
import Personas from './Personas'
import { useNavigate } from 'react-router-dom';
import AgregarPersona from './AgregarPersona'
import TiempoRestante from './TiempoRestante'
import '../styles/Dashboard.css'
import ChartReports from './ChartReports';
import PorcentajeCensados from './PorcentajeCensados';
import Mapa from './Mapa';

const Dashboard = () => {
  return (
    <div className='container dash'>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          </div>
        </div>
        <div className='row'>
          <ChartReports/>
        </div>
        <div className='row mb-4 cardStyle d-flex flex-column align-items-center'>
          <TiempoRestante />
          <AgregarPersona />
        </div>        
        <div className='row mb-4 cardStyle'>
          <Personas />
        </div>
        <div className='row text-center cardStyle'>
          <Mapa />
          <PorcentajeCensados />
        </div>
      </div>
    </div>
  )
}

export default Dashboard