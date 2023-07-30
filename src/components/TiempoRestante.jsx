import React from 'react'

const TiempoRestante = () => {
  const finalCenso = new Date('2023-08-31')
  const fecha = new Date()

  const differenceInMilliseconds = finalCenso - fecha;

  const daysLeft = Math.trunc(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  return (
    <>
    <h3>Faltan {daysLeft} días para que finalice el censo 2023.</h3>
    </>
  )
}

export default TiempoRestante