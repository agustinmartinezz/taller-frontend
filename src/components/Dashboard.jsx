import React from 'react'
import Personas from './Personas'
import AgregarPersona from './AgregarPersona'

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <Personas />
      <AgregarPersona />
    </div>
  )
}

export default Dashboard