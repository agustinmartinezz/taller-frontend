import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { validateNumber, validateText, validateDate, esMenorEdad } from '../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { setDepartamentos } from '../features/departamentoSlice'
import { addPersona } from '../features/personaSlice'

const AgregarPersona = () => {
  const BASE_URL = "https://censo.develotion.com/"
  const api_key = "5a15b2ee00dbc3f9ca1d0bdf15d723d1"
  const user_id = "600"

  const headers = {
    "Content-Type" : "application/json",
    "apikey" : api_key,
    "iduser" : user_id
  }
  
  const dispatch = useDispatch()

  const departamento = useSelector(state => state.departamento)

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

    dispatch(setDepartamentos(res.data.departamentos))
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

  const agregarPersona = async () => {
    let nombre = getNombre()

    if (!validateText(nombre)) {
      toast.error("Ingrese un nombre válido.")
      return
    }

    if (!validateDate(fechaNac)) {
      toast.error("Ingrese una fecha de nacimiento válida.")
      return
    }

    if (!validateNumber(selectedDep)) {
      toast.error("Ingrese un departamento.")
      return
    }

    if (!validateNumber(selectedCiu)) {
      toast.error("Ingrese una ciudad.")
      return
    }   

    if (!validateNumber(selectedOcup)) {
      toast.error("Ingrese una ocupación.")
      return 
    }

    const body = {
      idUsuario : user_id,
      nombre : nombre,
      departamento : selectedDep,
      ciudad : selectedCiu,
      fechaNacimiento : fechaNac,
      ocupacion : selectedOcup
    }

    try {
      const res = await axios.post(BASE_URL + "/personas.php", body, { headers })
      if (res.data.codigo === 200) {
        toast.success("Persona agregada con éxito!")

        body.id = res.data.idCenso

        dispatch(addPersona(body))
      } else {
        toast.error(res.data.mensaje);
      }
    } catch (e) {
      toast.error(e.message);
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
              {departamento.departamentos.map((departamento) => (
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
        <div className='row text-center'>
          <button className='btn btn-success mt-3' onClick={agregarPersona}>Agregar Persona</button>
        </div>
      </>
  )
}

export default AgregarPersona