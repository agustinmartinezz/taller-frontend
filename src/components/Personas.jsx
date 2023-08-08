import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Persona from './Persona';
import '../styles/Personas.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPersonas } from '../features/personaSlice';
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
        navigate("/login");
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

  useEffect(() => {
    getPersonas()
  }, [])

  useEffect(() => {
    filterPersonas()
  }, [persona,selectedOcup])

  return (

    <div className="container">
      <div className="mb-4 d-flex flex-column align-items-center">
        <label className="form-label fw-bold" htmlFor="selectOcupacion">Filtrar por Ocupación</label>
        <select className="form-select w-25" id="selectOcupacion" value={selectedOcup} onChange={(e) => {
          setSelectedOcup(e.target.value)
        }}>
          <option value={0}>Todos</option>
          {ocupaciones.map((ocupacion) => (
            <option key={ocupacion.id} value={ocupacion.id}>{ocupacion.ocupacion}</option>
          ))}
        </select>
      </div>
      <div className="row justify-content-center">
        {personasVisibles.map((persona) => (
          <div key={persona.id} className="col-md-4 col-sm-6 col-12 mb-4">
            <div className="card">
              <div className="card-body">
                <Persona {...persona} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}

export default Personas