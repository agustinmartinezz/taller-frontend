import React from 'react'
import Personas from './Personas'
import { useNavigate,Link } from 'react-router-dom';
import AgregarPersona from './AgregarPersona'
import TiempoRestante from './TiempoRestante'
import Card from './Card'
import '../styles/Dashboard.css'
import ChartReports from './ChartReports';
import PorcentajeCensados from './PorcentajeCensados';
import {getCredentials } from '../Utils/utils'
import { useDispatch, useSelector } from 'react-redux'



const Dashboard = () => {
  const navigate = useNavigate();
  const usuarioLogueado = useSelector(state => state.logueado).logueado;

  
  const apiKey = getCredentials().apiKey;
  const userId = getCredentials().userId;

  if(!apiKey || !userId) { 
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
      </div>
    </div>
  )
}

export default Dashboard