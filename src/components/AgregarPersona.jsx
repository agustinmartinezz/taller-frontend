import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import Select from 'react-select';
import { useNavigate,Link } from 'react-router-dom';
import { validateNumber, validateText, validateDate, esMenorEdad, getCredentials } from '../Utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { setDepartamentos } from '../features/departamentoSlice'
import { addPersona } from '../features/personaSlice'
import { API_BASE_URL } from "../config/apiConfig";

const AgregarPersona = () => {

  const BASE_URL = API_BASE_URL;
  console.log('getCredentials()',getCredentials())
  const api_key = getCredentials().apiKey //! do not hardcode
  const user_id = getCredentials().userId//! do not hardcode

  const headers = {
    "Content-Type" : "application/json",
    "apikey" : api_key,
    "iduser" : user_id
  }
  
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const departamento = useSelector(state => state.departamento);
  const ocupaciones = useSelector(state => state.ocupacion).ocupaciones;


  const [ciudades, setCiudades] = useState([])
  const [ocuFiltradas, setOcupaciones] = useState([ocupaciones])

  const nombreUsuario = useRef(null)
  const [fechaNac, setFechaNac] = useState("")
  const [esMenor, setEsMenor] = useState(false)
  const [selectedDep, setSelectedDep] = useState("")
  const [selectedCiu, setSelectedCiu] = useState("")
  const [selectedOcup, setSelectedOcup] = useState("")

  const getDepartamentos = async () => {
    const data = {headers};
    axios.get(BASE_URL + "/departamentos.php", data)
    .then((res) => {
        if(res.codigo == 401)  navigate("/login");
        console.log("Success:", res.data);
        const formattedDepartamentos = res.data.departamentos.map((dep) => ({value : dep.id, label : dep.nombre}))
        dispatch(setDepartamentos(formattedDepartamentos))
    })
    .catch((error) => {
        console.error("Error:", error);
        navigate("/login");
    });

  }

  const getCiudades = async () => {
    const data = {
      headers : headers,
      params : {
        idDepartamento : selectedDep
      }
    }

    const res = await axios.get(BASE_URL + "/ciudades.php", data)
    
    const formattedCiudades = res.data.ciudades.map((ciu) => ({value : ciu.id, label : ciu.nombre}))

    setCiudades(formattedCiudades)
  }

  const getOcupaciones = (ocupaciones) => {
    debugger
    const filtered = ocupaciones.filter((ocupacion) => (
      ocupacion.ocupacion == "Estudiante" || esMenor == false
    ))

    setOcupaciones(filtered.map((ocup) => ({value : ocup.id, label : ocup.ocupacion})))
  }

  const agregarPersona = async () => {
    let nombre = nombreUsuario.current.value

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
        limpiarEstados()
        body.id = res.data.idCenso

        dispatch(addPersona(body))
      } else {
        toast.error(res.data.mensaje);
      }
    } catch (e) {
      toast.error(e.message);
    }
  }

  const limpiarEstados = () => {
    document.getElementById('txtNombrePersona').value = ""
    setFechaNac("")
    setSelectedDep(0)
    setSelectedCiu(0)
    setSelectedOcup(0)
  }

  useEffect(() => {
    getDepartamentos()
  }, [])

  useEffect(() => {
    setSelectedCiu("")
    getCiudades()
  }, [selectedDep])

  useEffect(() => {
    getOcupaciones(ocupaciones)
  }, [esMenor])

  useEffect(() => {
    setEsMenor(esMenorEdad(fechaNac))
  }, [fechaNac])

  return (
      <>
        <div className='row mb-3'>
            <div className='col-8'>
              <input type="text" id="txtNombrePersona" className="form-control" placeholder='Nombre' ref={nombreUsuario}/>
            </div>
            <div className='col-4'>
              <input id="birthDate" className="form-control" type="date" placeholder='Nacimiento' value={fechaNac} onChange={(e) => {
                setFechaNac(e.target.value)
              }}/>
            </div>
        </div>
        <div className='row'>
          <div className='col-4'>
            <Select
              defaultValue={selectedDep}
              placeholder="Seleccione Departamento"
              onChange={(e) => {
                setSelectedDep(e.value);
              }}
              options={departamento.departamentos}
            />
          </div>
          <div className='col-4'>
            <Select
              defaultValue={selectedCiu}
              placeholder="Seleccione Ciudad"
              onChange={(e) => {
                setSelectedCiu(e.value);
              }}
              options={ciudades}
            />
          </div>
          <div className='col-4'>
            <Select
              defaultValue={selectedOcup}
              placeholder="Seleccione Ocupacion"
              onChange={(e) => {
                setSelectedOcup(e.value);
              }}
              options={ocuFiltradas}
            />
          </div>
        </div>
        <div className='row text-center'>
          <button className='btn btn-success mt-3' onClick={agregarPersona}>Agregar Persona</button>
        </div>
      </>
  )
}

export default AgregarPersona