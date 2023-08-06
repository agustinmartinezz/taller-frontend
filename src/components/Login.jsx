import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Session.css';
import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import {API_BASE_URL,API_ENDPOINTS} from "../config/apiConfig";
import { setUsuario } from '../features/logueadoSlice'
import { getCredentials } from '../utils/utils'

const Login = () => {
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
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserBody({ ...userBody, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!userBody.usuario || !userBody.password){
      setErrorMsg('Please complete all fields');
      setUserBody({
        usuario: '',
        password: ''
      });
    }else{
      loguearUsuario(userBody);
    }
  };

  const loguearUsuario = async (body) => {
    const res = await axios.post(API_BASE_URL + API_ENDPOINTS.login, body)
      .then((response) => {
        console.log('Solicitud exitosa:', response.data);
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
        console.error('Error en la solicitud:', error);
      });
  }


  return (
    <div className="d-flex align-items-start h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
        <form style={{ width: '23rem' }}>
        <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>

        <div className="form-outline mb-4">
            <input value={userBody.usuario} type="text" name="usuario" 
            onChange={handleChange} 
            placeholder="username" className="form-control form-control-lg" />
        </div>

        <div className="form-outline mb-4">
            <input value={userBody.password} type="password" name="password"
            onChange={handleChange} 
            placeholder="password" className="form-control form-control-lg" />
        </div>

        <div className="pt-1 mb-4">
            <button className="btn btn-session btn-info btn-lg btn-block" type="button"
            onClick={handleSubmit} 
            >Login</button>
        </div>
        {errorMsg && <p className="alert alert-danger" role="alert">{errorMsg}</p>}
        
        <p>Don't have an account? <Link href="/register" className="link-info">Register here</Link></p>
        </form>
    </div>
  );
};

export default Login;
