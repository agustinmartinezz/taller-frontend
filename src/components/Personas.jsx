import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Persona from './Persona';
import { useDispatch, useSelector } from 'react-redux';
import { setPersonas } from '../features/personaSlice';

const Personas = () => {
  const BASE_URL = "https://censo.develotion.com/"
  const api_key = "5a15b2ee00dbc3f9ca1d0bdf15d723d1"
  const user_id = "600"

  const headers = {
    "Content-Type" : "application/json",
      "apikey" : api_key,
      "iduser" : user_id
  }
  const persona = useSelector(state => state.persona)

  const dispatch = useDispatch()

  const [ocupaciones, setOcupaciones] = useState([])
  const [selectedOcup, setSelectedOcup] = useState(0)

  const getPersonas = async () => {
    const data = {
      headers : headers,
      params : {
        idUsuario : user_id
      }
    }

    const res = await axios.get(BASE_URL + "/personas.php", data)
    const personas = res.data.personas.filter((persona) => selectedOcup == 0 || persona.ocupacion == selectedOcup)

    dispatch(setPersonas(personas))
  }

  const getOcupaciones = async () => {
    const data = {
      headers : headers,
    }

    const res = await axios.get(BASE_URL + "/ocupaciones.php", data)

    setOcupaciones(res.data.ocupaciones)
  }

  useEffect(() => {
    getOcupaciones()
  }, [])

  useEffect(() => {
    getPersonas()
  }, [selectedOcup])

  return (
    <div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="selectOcupacion">Ocupacion</label>
        </div>
        <select className="custom-select" id="selectOcupacion" value={selectedOcup} onChange={(e) => {
          setSelectedOcup(e.target.value)
        }}>
          <option value={0}>Todos</option>
          {ocupaciones.map((ocupacion) => (
            <option key={ocupacion.id} value={ocupacion.id}>{ocupacion.ocupacion}</option>
          ))}
        </select>
      </div>
       <section className='row gap-2'>
       {persona.personas.map((persona) => (
            <article key={persona.id} className='col-2 mb-3'>
              <Persona {...persona}/>
            </article>
          ))}
       </section>
    </div>
  );
}

export default Personas