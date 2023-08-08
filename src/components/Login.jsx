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


  useEffect(() => {
    if(apiKey && userId) {
      navigate('/dashboard');
    }
  }, [apiKey,userId])

  const [userBody, setUserBody] = useState({
    usuario: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserBody({ ...userBody, [name]: value });
    setIsButtonDisabled(!userBody.usuario || !userBody.password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!userBody.usuario || !userBody.password){
      setErrorMsg('Por favor ingrese usuario y contraseña.');
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
        <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Ingreso</h3>

        <div className="form-outline mb-4">
            <input value={userBody.usuario} type="text" name="usuario" 
            onChange={handleChange} 
            placeholder="Usuario" className="form-control form-control-lg" />
        </div>

        <div className="form-outline mb-4">
            <input value={userBody.password} type="password" name="password"
            onChange={handleChange} 
            placeholder="Contraseña" className="form-control form-control-lg" />
        </div>

        <div className="pt-1 mb-4">
            <button className="btn btn-session btn-info btn-lg btn-block" type="button"
            disabled={isButtonDisabled}
            onClick={handleSubmit} 
            >Ingresar</button>
        </div>
        {errorMsg && <p className="alert alert-danger" role="alert">{errorMsg}</p>}
        
        <p>No tienes cuenta? <a href="/register" className="link-info">Regístrate aquí.</a></p>
        </form>
    </div>
  );
};

export default Login;
