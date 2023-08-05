import {React, useState, useEffect} from 'react'

const Navigation = () => {
  const logOut = () => {
    localStorage.removeItem('apiKey');
  }

  const [logueado, setLoguedo] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('apiKey') && localStorage.getItem("userId")) {
      setLoguedo(true);
    }
  }, []);


  return (
    <div className='bg-dark'>
      <nav className="navbar navbar-expand navbar-dark container">
        <a className="navbar-brand" href="/">Censo 2023</a>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <a className="nav-link text-light" href="/dashboard">Dashboard</a>
          </li>
          {logueado ? 
            <li className="nav-item">
              <button className="nav-link text-light" onClick={logOut}>Cerrar Sesión</button>
            </li> :
            <>
              <li className="nav-item">
                <a className="nav-link text-light" href="/register">Registrarse</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="/login">Login</a>
              </li>
            </>
            }
        </ul>
      </nav>
    </div>
  )
}

export default Navigation