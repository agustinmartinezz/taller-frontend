import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Session.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL,API_ENDPOINTS} from "../config/apiConfig";


const Registro = () => {
    const [userBody, setUserBody] = useState({
        usuario: '',
        password: '',
        confitm: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUserBody({ ...userBody, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        registrarUsuario(userBody);
      };
        const navigate = useNavigate();
    
      const registrarUsuario = async (body) => {
        debugger
        const res = await axios.post(API_BASE_URL + API_ENDPOINTS.register, body)
          .then((response) => {
            console.log('Solicitud exitosa:', response.data);
            localStorage.setItem('apikey',response.data.apiKey); 
            navigate("/dashboard");
          })
          .catch((error) => {
            //borrar datos
            console.error('Error en la solicitud:', error);
          });
      }



  return (
    <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
        <form style={{ width: '23rem' }}>
        <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Register</h3>

        <div className="form-outline mb-4">
            <input type="text" id="form2Example18" 
            onChange={handleChange} name="usuario"
            placeholder="name" className="form-control form-control-lg" />
        </div>

        <div className="form-outline mb-4">
            <input type="password" id="form2Example28" 
            onChange={handleChange} name="password"
            placeholder="password" className="form-control form-control-lg" />
        </div>

        <div className="form-outline mb-4">
            <input type="password" id="form2Example28" 
            onChange={handleChange} name="confirm"
            placeholder="confirm" className="form-control form-control-lg" />
        </div>

        <div className="pt-1 mb-4">
            <button  onChange={handleSubmit} className="btn btn-info btn-session btn-lg btn-block" type="button">Register</button>
        </div>

        {/* parrafo para mostrar errores */}

        <p>Already have an account? <a href="/login" className="link-info">Login here</a></p>
        </form>
    </div>
  );
};

export default Registro;
