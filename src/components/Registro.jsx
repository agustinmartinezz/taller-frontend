import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Session.css';
import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setUsuario } from '../features/logueadoSlice'
import { getCredentials } from '../utils/utils'
import axios from 'axios';
import {API_BASE_URL,API_ENDPOINTS} from "../config/apiConfig";

const Registro = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const usuarioLogueado = useSelector(state => state.logueado).logueado;

    const apiKey = getCredentials().apiKey;
    const userId = getCredentials().userId;
  
    if(apiKey && userId) {
      navigate('/dashboard');
    }

    const [userBody, setUserBody] = useState({
        usuario: '',
        password: '',
        confirm: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUserBody({ ...userBody, [name]: value });
      };

      const [errorMsg, setErrorMsg] = useState('');

    
      const handleSubmit = (e) => {
        e.preventDefault();

        let error = "";
        if(!userBody.usuario || !userBody.password || !userBody.confirm) 
          error = 'Por favor ingrese todos los datos.';
        else if(userBody.password != userBody.confirm) 
          error = 'Las contraseñas deben coincidir.';  
        else{
          registrarUsuario(userBody);
        }
        setErrorMsg(error);
        setUserBody({
          usuario: '',
          password: ''
        });
      };

    
      const registrarUsuario = async (body) => {
        const res = await axios.post(API_BASE_URL + API_ENDPOINTS.register, body)
          .then((response) => {
            const usuarioLogueado = {
              apiKey: response.data.apiKey,
              userId: response.data.id
            }
            localStorage.setItem('apiKey',usuarioLogueado.apiKey); 
            localStorage.setItem('userId',usuarioLogueado.userId); 

            dispatch(setUsuario(usuarioLogueado))
            navigate("/dashboard");
          })
          .catch((error) => {
            setErrorMsg(error.response.data.mensaje);
            setUserBody({
              usuario: '',
              password: ''
            });
          });
      }



  return (
    <div className="d-flex align-items-start h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
        <form style={{ width: '23rem' }}>
        <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Registro</h3>

        <div className="form-outline mb-4">
            <input value={userBody.usuario}type="text" 
            onChange={handleChange} name="usuario"
            placeholder="Nombre" className="form-control form-control-lg" />
        </div>

        <div className="form-outline mb-4">
            <input value={userBody.password}type="password" 
            onChange={handleChange} name="password"
            placeholder="Contraseña" className="form-control form-control-lg" />
        </div>

        <div className="form-outline mb-4">
            <input value={userBody.confirm}type="password"
            onChange={handleChange} name="confirm"
            placeholder="Repetir Contraseña" className="form-control form-control-lg" />
        </div>

        <div className="pt-1 mb-4">
            <button onClick={handleSubmit} className="btn btn-info btn-session btn-lg btn-block" type="button">Registrarse</button>
        </div>

        {errorMsg && <p className="alert alert-danger" role="alert">{errorMsg}</p>}

        <p>Ya tienes una cuenta? <a href="/login" className="link-info">Ingresa aquí!</a></p>
        </form>
    </div>
  );
};

export default Registro;
