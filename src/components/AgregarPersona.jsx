import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import Select from 'react-select';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { validateNumber, validateText, validateDate, esMenorEdad } from '../utils/utils'
import { useDispatch } from 'react-redux'
import { setDepartamentos } from '../features/departamentoSlice'
import { addPersona } from '../features/personaSlice'
import { API_BASE_URL } from "../config/apiConfig";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '50vh',
    width: '40vw',
    boxShadow: '6px 7px 38px 10px rgba(0,0,0,0.5)'
  },
};

const AgregarPersona = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    if(modalIsOpen){
      document.body.style.overflow = 'hidden';
    } 
  }

  function closeModal() {
    document.body.style.overflow = 'unset';
    setIsOpen(false);
  }

  const navigate = useNavigate();

  if(!localStorage.getItem("apiKey")){
    navigate("/login");
  }

  const api_key = "5a15b2ee00dbc3f9ca1d0bdf15d723d1" //! do not hardcode
  const user_id = "600"//! do not hardcode

  const headers = {
    "Content-Type" : "application/json",
    "apikey" : api_key,
    "iduser" : user_id
  }
  
  const dispatch = useDispatch()

  const [ciudades, setCiudades] = useState([])
  const [ocupaciones, setOcupaciones] = useState([])
  const [formattedDepartamentos, setFormattedDepartamentos] = useState([])

  const [fechaNac, setFechaNac] = useState("")
  const [esMenor, setEsMenor] = useState(false)
  const [selectedDep, setSelectedDep] = useState("")
  const [selectedCiu, setSelectedCiu] = useState("")
  const [selectedOcup, setSelectedOcup] = useState("")

  const nombreUsuario = useRef(null)

  const getDepartamentos = async () => {
    const data = {
      headers : headers,
    }

    const res = await axios.get(API_BASE_URL + "/departamentos.php", data)
    const formattedDepartamentos = res.data.departamentos.map((dep) => ({value : dep.id, label : dep.nombre}))

    dispatch(setDepartamentos(res.data.departamentos))
    setFormattedDepartamentos(formattedDepartamentos)
  }

  const getCiudades = async () => {
    const data = {
      headers : headers,
      params : {
        idDepartamento : selectedDep
      }
    }

    const res = await axios.get(API_BASE_URL + "/ciudades.php", data)
    
    const formattedCiudades = res.data.ciudades.map((ciu) => ({value : ciu.id, label : ciu.nombre}))

    setCiudades(formattedCiudades)
  }

  const getOcupaciones = async () => {
    const data = {
      headers : headers,
    }

    const res = await axios.get(API_BASE_URL + "/ocupaciones.php", data)

    const filtered = res.data.ocupaciones.filter((ocupacion) => (
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
      const res = await axios.post(API_BASE_URL + "/personas.php", body, { headers })
      if (res.data.codigo === 200) {
        toast.success("Persona agregada con éxito!")

        limpiarEstados()

        body.id = res.data.idCenso
        dispatch(addPersona(body))

        closeModal()
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
    getOcupaciones()
  }, [esMenor])

  useEffect(() => {
    setEsMenor(esMenorEdad(fechaNac))
  }, [fechaNac])

  return (
      <>
        <button className='btn btn-success my-3 w-100' onClick={openModal}>Censar Persona</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Agregar Persona"
        >
          
          <div className='h-100 d-flex flex-column justify-content-around text-center'>
            <h2>Censar Persona</h2>
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
              <div className='col-6'>
                <Select
                  defaultValue={selectedDep}
                  placeholder="Seleccione Departamento"
                  onChange={(e) => {
                    setSelectedDep(e.value);
                  }}
                  options={formattedDepartamentos}
                />
              </div>
              <div className='col-6'>
                <Select
                  defaultValue={selectedCiu}
                  placeholder="Seleccione Ciudad"
                  onChange={(e) => {
                    setSelectedCiu(e.value);
                  }}
                  options={ciudades}
                />
              </div>
              
            </div>
            <div className='row'>
              <div className='col-12'>
                  <Select
                    defaultValue={selectedOcup}
                    placeholder="Seleccione Ocupacion"
                    onChange={(e) => {
                      setSelectedOcup(e.value);
                    }}
                    options={ocupaciones}
                  />
                </div>
            </div>
            <div className='row text-center justify-content-evenly'>
              <button className='btn btn-success mt-3 w-50' onClick={agregarPersona}>Confirmar</button>
            </div>
          </div>
        </Modal>
      </>
  )
}

export default AgregarPersona