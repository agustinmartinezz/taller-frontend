import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom';


const Personas = () => {
  const navigate = useNavigate();

  if(!localStorage.getItem("apiKey")){
    navigate("/login");
  }

  const BASE_URL = "https://censo.develotion.com/"
  const api_key = "5a15b2ee00dbc3f9ca1d0bdf15d723d1"
  const user_id = "600"

  const headers = {
    "Content-Type" : "application/json",
      "apikey" : api_key,
      "iduser" : user_id
  }

  const [ocupaciones, setOcupaciones] = useState([])
  const [selectedOcup, setSelectedOcup] = useState(0)
  const [personas, setPersonas] = useState([])

  const getPersonas = async () => {
    const data = {
      headers : headers,
      params : {
        idUsuario : user_id
      }
    }

    const res = await axios.get(BASE_URL + "/personas.php", data)
    
    setPersonas(res.data.personas.filter((persona) => selectedOcup == 0 || persona.ocupacion == selectedOcup))
  }

  const getOcupaciones = async () => {
    const data = {
      headers : headers,
    }

    const res = await axios.get(BASE_URL + "/ocupaciones.php", data)

    setOcupaciones(res.data.ocupaciones)
  }

  const deletePersona = async (idPersona) => {
    const data = {
      headers: headers,
      params : {
        idCenso : idPersona
      }
    }

    try {
      await axios.delete(BASE_URL + "/personas.php", data)
    } catch {
      alert("Error al eliminar persona")
    }
  }

  useEffect(() => {
    getOcupaciones()
  }, [])

  useEffect(() => {
    getPersonas()
  }, [selectedOcup])

  const eliminarPersona = (e) => {
    deletePersona(e.target.id)
    .then(() => {
      getPersonas()
    })
  }

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
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>        
          {personas.map((persona) => (
            <tr key={persona.id} data-ocup={persona.ocupacion}>
              <th scope='row'>{persona.id}</th>
              <td>{persona.nombre}</td>
              <td><button className='btn btn-danger' id={persona.id} onClick={eliminarPersona}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Personas