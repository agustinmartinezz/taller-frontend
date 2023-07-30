import React from 'react';
import Registro from './Registro';
import Login from './Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Session.css';
import logo_censo from '../media/logo_censo.svg';
import session_background from '../media/session-background.jpg';


const Session = (prop) => {
  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 py-5 text-black">
            <div className="px-5 ms-xl-4">
              <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style={{ color: '#709085' }}></i>
              
                <img src={logo_censo}
                alt="Login image" className="logo-censo" style={{ objectFit: 'cover', objectPosition: 'left' }} />
            </div>
           {prop.operation == 'login' ? <Login/> : <Registro/>}
          </div>
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img src={session_background}
              alt="Login image" className="w-100 vh-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Session;
