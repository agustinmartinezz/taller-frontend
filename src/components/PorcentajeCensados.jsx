import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "../config/apiConfig";

const PorcentajeCensados = () => {
  const navigate = useNavigate();

  if(!localStorage.getItem("apiKey")){
    navigate("/login");
  }

  const BASE_URL = API_BASE_URL;
  const api_key = "5a15b2ee00dbc3f9ca1d0bdf15d723d1" //! do not hardcode
  const user_id = "600"//! do not hardcode

  const headers = {
    "Content-Type" : "application/json",
    "apikey" : api_key,
    "iduser" : user_id
  }

  const persona = useSelector(state => state.persona)
  const [censadosTotales, setCensadosTotales] = useState(0)
  const [porcentajeUsuario, setPorcentajeUsuario] = useState(0)

  const getTotalCensados = async () => {
    const data = {
      headers : headers,
    }

    const res = await axios.get(BASE_URL + "/totalCensados.php", data)

    setCensadosTotales(res.data.total)
  }

  const censadosUsuario = persona.personas.length

  useEffect(() => {
    getTotalCensados()
    setPorcentajeUsuario((censadosUsuario * 100 / censadosTotales).toFixed(2))
  },[censadosTotales, persona])

  return (
    <>
      <h3>Este usuario censó al {porcentajeUsuario}% de las personas censadas.</h3>
      <p>{censadosUsuario} de {censadosTotales}</p>
    </>
  )
}

export default PorcentajeCensados