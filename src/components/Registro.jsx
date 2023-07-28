import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Session.css';
import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL,API_ENDPOINTS} from "../config/apiConfig";


const Registro = () => {
    const navigate = useNavigate();

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
          error = 'Please complete all fields';
        else if(userBody.password != userBody.confirm) 
          error = 'Passwords need to be the same';  
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
        debugger
        const res = await axios.post(API_BASE_URL + API_ENDPOINTS.register, body)
          .then((response) => {
            console.log('Solicitud exitosa:', response.data);
            localStorage.setItem('apiKey',response.data.apiKey); 
            localStorage.setItem('idUsuario',response.data.id); 
            navigate("/dashboard");
          })
          .catch((error) => {
            setErrorMsg(error.response.data.mensaje);
            setUserBody({
              usuario: '',
              password: ''
            });
            console.error('Error en la solicitud:', error.response.data.mensaje);
          });
      }



  return (
    <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
        <form style={{ width: '23rem' }}>
        <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Register</h3>

        <div className="form-outline mb-4">
            <input value={userBody.usuario}type="text" 
            onChange={handleChange} name="usuario"
            placeholder="name" className="form-control form-control-lg" />
        </div>

        <div className="form-outline mb-4">
            <input value={userBody.password}type="password" 
            onChange={handleChange} name="password"
            placeholder="password" className="form-control form-control-lg" />
        </div>

        <div className="form-outline mb-4">
            <input value={userBody.confirm}type="password"
            onChange={handleChange} name="confirm"
            placeholder="confirm" className="form-control form-control-lg" />
        </div>

        <div className="pt-1 mb-4">
            <button onClick={handleSubmit} className="btn btn-info btn-session btn-lg btn-block" type="button">Register</button>
        </div>

        {errorMsg && <p className="alert alert-danger" role="alert">{errorMsg}</p>}

        <p>Already have an account? <Link href="/login" className="link-info">Login here</Link></p>
        </form>
    </div>
  );
};

export default Registro;
