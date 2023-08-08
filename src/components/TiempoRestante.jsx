import React, { useState } from 'react'
import Modal from 'react-modal';
import { finDelCenso } from '../utils/utils.js';
// import '../styles/Dashboard.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '15vh',
    width: '40vw',
    boxShadow: '6px 7px 38px 2px rgba(0,0,0,0.5'
  },
};

const TiempoRestante = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    if(modalIsOpen){
      document.body.style.overflow = 'hidden';
    } 
  }

  function closeModal() {
    document.body.style.overflow = 'unset';
    setIsOpen(false);
  }

  const finalCenso = new Date(finDelCenso)
  const fecha = new Date()

  const differenceInMilliseconds = finalCenso - fecha;

  const daysLeft = Math.trunc(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  return (
      <>
      <button className='btn btn-secondary my-3 w-50' onClick={openModal}>Días restantes</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Dias Restantes"
      >
        <div className='modal-content'>
          <div className='modal-body'>
            <div className='row text-center'>
              <h3 className='m-0'>Faltan {daysLeft} días para que finalice el censo 2023.</h3>
            </div>
            <div className='row my-3 justify-content-center'>
              <button className='btn btn-danger w-50' onClick={closeModal}>Cerrar</button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  

  )
}

export default TiempoRestante