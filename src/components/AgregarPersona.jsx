import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import {API_BASE_URL,API_ENDPOINTS} from "../config/apiConfig";


const AgregarPersona = () => {
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

  const [departamentos, setDepartamentos] = useState([])
  const [ciudades, setCiudades] = useState([])
  const [ocupaciones, setOcupaciones] = useState([])

  const [selectedDep, setSelectedDep] = useState("")
  const [selectedCiu, setSelectedCiu] = useState("")
  const [selectedOcup, setSelectedOcup] = useState("")

  const getDepartamentos = async () => {
    const data = {
      headers : headers,
    }

    const res = await axios.get(BASE_URL + "/departamentos.php", data)

    setDepartamentos(res.data.departamentos)
  }

  const getCiudades = async () => {
    const data = {
      headers : headers,
      params : {
        idDepartamento : selectedDep
      }
    }

    const res = await axios.get(BASE_URL + "/ciudades.php", data)
    setCiudades(res.data.ciudades)
  }

  const getOcupaciones = async () => {
    const data = {
      headers : headers,
    }

    const res = await axios.get(BASE_URL + "/ocupaciones.php", data)

    setOcupaciones(res.data.ocupaciones)
  }

  useEffect(() => {
    getDepartamentos()
    getOcupaciones()
  }, [])

  useEffect(() => {
    getCiudades()
  }, [selectedDep])

  return (
    <div>
      <div className="form-outline">
        <label className="form-label" htmlFor="txtNombrePersona">Nombre</label>
        <input type="text" id="txtNombrePersona" className="form-control" />

        <label htmlFor="selectDepartamento" className="form-label">Departamento</label>
        <select className="custom-select" id="selectDepartamento" value={selectedDep} onChange={(e) => {
          setSelectedDep(e.target.value)
        }}>
          <option value="">Seleccione Departamento</option>
          {departamentos.map((departamento) => (
            <option key={departamento.id} value={departamento.id}>{departamento.nombre}</option>
          ))}
        </select>

        <label htmlFor="selectCiudad" className="form-label">Ciudad</label>
        <select className="custom-select" id="selectCiudad" value={selectedCiu} onChange={(e) => {
          setSelectedCiu(e.target.value)
        }}>
          <option value="">Seleccione Ciudad</option>
          {ciudades.map((ciudad) => (
            <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
          ))}
        </select>

        <label htmlFor="selectOcupacion" className="form-label">Ocupacion</label>
        <select className="custom-select" id="selectOcupacion" value={selectedOcup} onChange={(e) => {
          setSelectedOcup(e.target.value)
        }}>
          <option value="">Seleccione Ocupacion</option>
          {ocupaciones.map((ocupacion) => (
            <option key={ocupacion.id} value={ocupacion.id}>{ocupacion.ocupacion}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default AgregarPersona