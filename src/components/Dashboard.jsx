import React from 'react'
import Personas from './Personas'
import { useNavigate } from 'react-router-dom';
import AgregarPersona from './AgregarPersona'
import TiempoRestante from './TiempoRestante'
import '../styles/Dashboard.css'
import ChartReports from './ChartReports';
import PorcentajeCensados from './PorcentajeCensados';
import { getCredentials } from '../utils/utils'
import { useSelector } from 'react-redux'
import Mapa from './Mapa';

const Dashboard = () => {
  const navigate = useNavigate();
  const usuarioLogueado = useSelector(state => state.logueado).logueado;
  
  const apiKey = getCredentials().apiKey;
  const userId = getCredentials().userId;

  if(!usuarioLogueado.apiKey && !usuarioLogueado.userId) { 
    navigate('/dashboard');
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