import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Persona from './Persona';
import '../styles/Personas.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPersonas } from '../features/personaSlice';
import { setUsuario } from '../features/logueadoSlice'
import { API_BASE_URL } from "../config/apiConfig";
import { getCredentials } from '../utils/utils'

const Personas = () => {
  const BASE_URL = API_BASE_URL;
  const api_key = getCredentials().apiKey
  const user_id = getCredentials().userId

  const headers = {
    "Content-Type" : "application/json",
      "apikey" : api_key,
      "iduser" : user_id
  }
  const persona = useSelector(state => state.persona);
  const ocupaciones = useSelector(state => state.ocupacion).ocupaciones;

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [personasVisibles, setPersonasVisibles] = useState(persona.personas)
  const [selectedOcup, setSelectedOcup] = useState(0)

  const getPersonas = async () => {
    const data = {
      headers : headers,
      params : {
        idUsuario : user_id
      }
    }

    await axios.get(BASE_URL + "/personas.php", data)
    .then((res) => {
      if(res.codigo == 401)
        logOut()
      
      dispatch(setPersonas(res.data.personas))
      setPersonasVisibles(res.data.personas)
    })
    .catch((error) => {
      console.error("Error:", error);
      navigate("/login");
    })
  }

  const filterPersonas = () => {
    const visibles = persona.personas.filter((persona) => selectedOcup == 0 || persona.ocupacion == selectedOcup)
    setPersonasVisibles(visibles)
  }

  const logOut = () => {
    const usuarioLogueado = {}
    dispatch(setUsuario(usuarioLogueado));
    localStorage.removeItem('apiKey');
    localStorage.removeItem('userId');
    navigate('/login');
  }

  useEffect(() => {
    getPersonas()
  }, [])

  useEffect(() => {
    filterPersonas()
  }, [persona,selectedOcup])

  return (
    <div>
      <div className="mb-4 d-flex flex-column align-items-center">
        <label className="form-label fw-bold" htmlFor="selectOcupacion">Filtrar por Ocupación</label>
        <select className="form-select w-75" id="selectOcupacion" value={selectedOcup} onChange={(e) => {
          setSelectedOcup(e.target.value)
        }}>
          <option value={0}>Todos</option>
          {ocupaciones.map((ocupacion) => (
            <option key={ocupacion.id} value={ocupacion.id}>{ocupacion.ocupacion}</option>
          ))}
        </select>
      </div>
       <section className='row gap-2 justify-content-center'>
       {personasVisibles.map((persona) => (
            <article key={persona.id} className='col-sm-8 col-md-3 col-xl-2 articlePersona'>
              <Persona {...persona}/>
            </article>
          ))}
       </section>
    </div>
  );
}

export default Personas