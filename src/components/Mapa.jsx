import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useSelector } from 'react-redux';
import userEvent from '@testing-library/user-event';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Mapa = () => {
  const departamento = useSelector(state => state.departamento)
  const persona = useSelector(state => state.persona)
  
  const getCensadosDepartamento = (depId) => {
    return persona.personas.filter((p) => p.departamento == depId).length
  }

  return (
    <MapContainer className='z-0' center={[-33, -56]} zoom={6} scrollWheelZoom={false} style={{height: "400px", width:"100%"}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {departamento.departamentos.map((dep, i) => (
        <Marker key={i} position={[dep.latitud, dep.longitud]}>
          <Popup>
            Este usuario censó {getCensadosDepartamento(dep.id)} personas en el departamento de {dep.nombre}
          </Popup>
        </Marker>
      ))}
      
    </MapContainer>
  )
}

export default Mapa