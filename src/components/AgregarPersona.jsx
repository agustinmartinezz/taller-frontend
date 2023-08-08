import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import Select from 'react-select';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { validateNumber, validateText, validateDate, esMenorEdad, getCredentials } from '../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
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
  const BASE_URL = API_BASE_URL;
  const api_key = getCredentials().apiKey
  const user_id = getCredentials().userId

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

  const headers = {
    "Content-Type" : "application/json",
    "apikey" : api_key,
    "iduser" : user_id
  }
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ocupaciones = useSelector(state => state.ocupacion).ocupaciones;

  const [ciudades, setCiudades] = useState([])
  const [ocupacionesFiltradas, setOcupacionesFiltradas] = useState([ocupaciones])
  const [formattedDepartamentos, setFormattedDepartamentos] = useState([])

  const [fechaNac, setFechaNac] = useState("")
  const [esMenor, setEsMenor] = useState(false)
  const [selectedDep, setSelectedDep] = useState("")
  const [selectedCiu, setSelectedCiu] = useState("")
  const [selectedOcup, setSelectedOcup] = useState("")

  const nombreUsuario = useRef(null)

  const getDepartamentos = async () => {
    const data = {headers};

    await axios.get(BASE_URL + "/departamentos.php", data)
    .then((res) => {
        if(res.codigo == 401)
          navigate("/login");

        const formattedDepartamentos = res.data.departamentos.map((dep) => ({value : dep.id, label : dep.nombre}))
        dispatch(setDepartamentos(res.data.departamentos))
        setFormattedDepartamentos(formattedDepartamentos)
    })
    .catch(() => {
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

    await axios.get(API_BASE_URL + "/ciudades.php", data)
    .then((res) => {
      if(res.codigo == 401)
        navigate("/login");

      const formattedCiudades = res.data.ciudades.map((ciu) => ({value : ciu.id, label : ciu.nombre}))
      setCiudades(formattedCiudades)
    })
    .catch(() => {
      navigate("/login");
    })
  }

  const getOcupaciones = (ocupaciones) => {
    const filtered = ocupaciones.filter((ocupacion) => (
      ocupacion.ocupacion == "Estudiante" || esMenor == false
    ))

    setOcupacionesFiltradas(filtered.map((ocup) => ({value : ocup.id, label : ocup.ocupacion})))
  }

  const agregarPersona = async () => {
    let nombre = nombreUsuario.current.value
    const today = new Date()
    const birth = new Date(fechaNac)
    
    if (!validateText(nombre)) {
      toast.error("Ingrese un nombre válido.")
      return
    }

    if (!validateDate(fechaNac) || birth > today) {
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
    getOcupaciones(ocupaciones)
  }, [ocupaciones, esMenor])

  useEffect(() => {
    setEsMenor(esMenorEdad(fechaNac))
  }, [fechaNac])

  return (
     
      <>
  <button className='btn btn-success my-3 w-50' onClick={openModal}>Censar Persona</button>
  <Modal
    isOpen={modalIsOpen}
    onAfterOpen={afterOpenModal}
    onRequestClose={closeModal}
    style={customStyles}
    contentLabel="Agregar Persona"
  >
    <div className='modal-content'>
      <div className='modal-header'>
        <h2 className='modal-title'>Censar Persona</h2>
      </div>
      <div className='modal-body'>
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
          <div className='col-6 mb-2'>
            <Select
              defaultValue={selectedDep}
              placeholder="Seleccione Departamento"
              onChange={(e) => {
                setSelectedDep(e.value);
              }}
              options={formattedDepartamentos}
            />
          </div>
          <div className='col-6 mb-2'>
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
          <div className='col-12 mb-2'>
            <Select
              defaultValue={selectedOcup}
              placeholder="Seleccione Ocupacion"
              onChange={(e) => {
                setSelectedOcup(e.value);
              }}
              options={ocupacionesFiltradas}
            />
          </div>
        </div>
      </div>
      <div className='modal-footer d-flex justify-content-center mb-2'>
        <button className='btn btn-success w-50' onClick={agregarPersona}>Confirmar</button>
      </div>
    </div>
  </Modal>
</>

  )
}

export default AgregarPersona