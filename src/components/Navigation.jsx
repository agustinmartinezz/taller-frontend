import {React, useState, useEffect} from 'react'
import { NavLink, Outlet } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { setUsuario } from '../features/logueadoSlice'
import { useNavigate,Link } from 'react-router-dom';



const Navigation = () => {
  const logueado = useSelector(state => state.logueado).logueado;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    const usuarioLogueado = {}
    dispatch(setUsuario(usuarioLogueado));
    localStorage.removeItem('apiKey');
    localStorage.removeItem('userId');
    navigate('/login');
  }


  return (
    <div className='bg-dark'>
      <nav className="navbar navbar-expand navbar-dark container">
        <a className="navbar-brand" href="/">Censo 2023</a>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
       
          {(logueado.apiKey && logueado.userId) ? 
            <>
              <li className="nav-item">
                  <NavLink className="nav-link text-light" to="/dashboard">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                  <button className="nav-link text-light" onClick={logOut}>Cerrar Sesión</button>
                </li> 
            </>
              :
            <>
              <li className="nav-item">
                <NavLink className="nav-link text-light" to="/register">Registrarse</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-light" to="/login">Login</NavLink>
              </li>
            </>
            }
        </ul>
      </nav>
      <Outlet/>
    </div>
    
  )
}

export default Navigation


