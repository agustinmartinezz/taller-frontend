import React from 'react'

const Navigation = () => {
  return (
    <div className='bg-dark d-flex justify-content-center'>
      <nav className="navbar navbar-expand navbar-dark w-75">
        <a className="navbar-brand" href="/">Censo 2023</a>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <a className="nav-link text-light" href="/register">Registrarse</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="/login">Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="/dashboard">Dashboard</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="/logout">Cerrar Sesión</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navigation