import React from 'react'
import Personas from './Personas'
import AgregarPersona from './AgregarPersona'

const Dashboard = () => {
  function validateText(inputText) {
    return inputText !== null && inputText.trim() !== '';
  }

  function validateDate(inputDate) {
    const dateObj = new Date(inputDate);
    return !isNaN(dateObj.getTime());
  }

  function validateNumber(inputNumber) {
    return !isNaN(parseFloat(inputNumber)) && isFinite(inputNumber);
  }

  return (
    <div className='container'>
      <h2>Dashboard</h2>
      <Personas />
      <AgregarPersona validateNumber={validateNumber} validateText={validateText} validateDate={validateDate} />
    </div>
  )
}

export default Dashboard