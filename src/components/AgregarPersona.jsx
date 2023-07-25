import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AgregarPersona = ({validateNumber, validateText, validateDate}) => {
  const BASE_URL = "https://censo.develotion.com/"
  const api_key = "5a15b2ee00dbc3f9ca1d0bdf15d723d1"
  const user_id = "600"

  const headers = {
    "Content-Type" : "application/json",
    "apikey" : api_key,
    "iduser" : user_id
  }

  const [departamentos, setDepartamentos] = useState([])
  const [ciudades, setCiudades] = useState([])
  const [ocupaciones, setOcupaciones] = useState([])

  const [fechaNac, setFechaNac] = useState("")
  const [esMenor, setEsMenor] = useState(false)
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

    setOcupaciones(res.data.ocupaciones.filter((ocupacion) => (
      ocupacion.ocupacion == "Estudiante" || esMenor == false
    )))
  }

  const esMenorEdad = (date) => {
    const currentDate = new Date();
    const inputDate = new Date(date);
    const differenceInMilliseconds = currentDate - inputDate;
    const yearsDifference = differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    return yearsDifference < 18;
  }

  const agregarPersona = async () => {
    let ingresoValido = true
    let nombre = getNombre()

    if (!validateText(nombre)) {
      ingresoValido = false
    }

    if (!validateNumber(selectedDep)) {
      ingresoValido = false
    }

    if (!validateNumber(selectedCiu)) {
      ingresoValido = false
    }   

    if (!validateNumber(selectedOcup)) {
      ingresoValido = false 
    }

    if (!validateDate(fechaNac)) {
      ingresoValido = false
    }

    if (ingresoValido) {
      const params = {
        idUsuario : user_id,
        nombre : nombre,
        departamento : selectedDep,
        ciudad : selectedCiu,
        fechaNacimiento : fechaNac,
        ocupacion : selectedOcup
      }
  
      const data = {
        headers : headers,
        params : params
      }
  
      const res = await axios.post(BASE_URL + "/personas.php", data)
    }
  }

  const getNombre = () => document.getElementById('txtNombrePersona').value

  useEffect(() => {
    getDepartamentos()
  }, [])

  useEffect(() => {
    getCiudades()
  }, [selectedDep])

  useEffect(() => {
    getOcupaciones()
  }, [esMenor])

  useEffect(() => {
    setEsMenor(esMenorEdad(fechaNac))
  }, [fechaNac])

  return (
      <>
        <div className='row'>
            <div className='col-8'>
              <label htmlFor="txtNombrePersona">Nombre</label>
              <input type="text" id="txtNombrePersona" className="form-control" placeholder='Nombre'/>
            </div>
            <div className='col-4'>
              <label htmlFor="birthDate">Nacimiento</label>
              <input id="birthDate" className="form-control" type="date" placeholder='Nacimiento' value={fechaNac} onChange={(e) => {
                setFechaNac(e.target.value)
              }}/>
            </div>
        </div>
        <div className='row'>
          <div className='col-4'>
            <label htmlFor="selectDepartamento" className="form-label">Departamento</label>
            <select className="form-select" id="selectDepartamento" value={selectedDep} onChange={(e) => {
              setSelectedDep(e.target.value)
            }}>
              <option value="">Seleccione Departamento</option>
              {departamentos.map((departamento) => (
                <option key={departamento.id} value={departamento.id}>{departamento.nombre}</option>
              ))}
            </select>
          </div>
          <div className='col-4'>
            <label htmlFor="selectCiudad" className="form-label">Ciudad</label>
            <select className="form-select" id="selectCiudad" value={selectedCiu} onChange={(e) => {
              setSelectedCiu(e.target.value)
            }}>
              <option value="">Seleccione Ciudad</option>
              {ciudades.map((ciudad) => (
                <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
              ))}
            </select>
          </div>
          <div className='col-4'>
            <label htmlFor="selectOcupacion" className="form-label">Ocupacion</label>
            <select className="form-select" id="selectOcupacion" value={selectedOcup} onChange={(e) => {
              setSelectedOcup(e.target.value)
            }}>
              <option value="">Seleccione Ocupacion</option>
              {ocupaciones.map((ocupacion) => (
                <option key={ocupacion.id} value={ocupacion.id}>{ocupacion.ocupacion}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='row'>
          <button className='btn btn-success mt-3' onClick={agregarPersona}>Agregar Persona</button>
        </div>
      </>
  )
}

export default AgregarPersona