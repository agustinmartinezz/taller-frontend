import React from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { eliminarPersona } from '../features/personaSlice'

const Persona = ({ id , nombre }) => {
  const BASE_URL = "https://censo.develotion.com/"
  const api_key = "5a15b2ee00dbc3f9ca1d0bdf15d723d1"
  const user_id = "600"

  const headers = {
    "Content-Type" : "application/json",
    "apikey" : api_key,
    "iduser" : user_id
  }

  const dispatch = useDispatch()

  const deletePersona = async (e) => {
    const idPersona = e.target.id

    const data = {
      headers: headers,
      params : {
        idCenso : idPersona
      }
    }

    try {
      const res = await axios.delete(BASE_URL + "/personas.php", data)

      if (res.data.codigo === 200) {
        toast.success("Persona eliminada con éxito.")
      } else {
        toast.error(e.data.mensaje)
      }

      dispatch(eliminarPersona(e.target.id))
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <div className='row justify-content-center text-center bg-light bg-gradient rounded-3'>
      <p className='mt-2'><strong>{id}</strong> - {nombre}</p>
      <button className='btn btn-danger w-50 mb-3' id={id} onClick={deletePersona} >Eliminar</button>
    </div>
  )
}

export default Persona