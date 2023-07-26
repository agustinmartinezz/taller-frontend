import React from 'react'
import Personas from './Personas'
import AgregarPersona from './AgregarPersona'
import TiempoRestante from './TiempoRestante'

const Dashboard = () => {
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