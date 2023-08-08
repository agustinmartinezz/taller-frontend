import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Card.css';
import Card from './Card';
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import Select from 'react-select';

import { useNavigate,Link } from 'react-router-dom';
import { getCredentials } from '../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import ocupacionSlice, { setOcupaciones } from '../features/ocupacionSlice'
import { API_BASE_URL } from "../config/apiConfig"; 
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ChartReports = () => {

    const BASE_URL = API_BASE_URL;
    const api_key = getCredentials().apiKey 
    const user_id = getCredentials().userId 
  
    const headers = {
      "Content-Type" : "application/json",
      "apikey" : api_key,
      "iduser" : user_id
    }

    const navigate = useNavigate();

    const dispatch = useDispatch()
   
    const getOcupaciones = async () => {
        const data = {headers};
        axios.get(BASE_URL + "/ocupaciones.php", data)
        .then((res) => {
            if(res.codigo == 401)
              navigate("/login");
            
            dispatch(setOcupaciones(res.data.ocupaciones))
        })
        .catch((error) => {
            console.error("Error:", error);
            navigate("/login");
        });
    }

    useEffect(() => {   
        getOcupaciones()
    }, [])
        
    const departamentos = useSelector(state => state.departamento).departamentos;
    const personas = useSelector(state => state.persona).personas;
    const ocupaciones = useSelector(state => state.ocupacion).ocupaciones;


    const mvdeoId = departamentos.find(dep => dep.nombre.toLowerCase() == 'montevideo')?.id;

    const infoTotales = getCensadosTotales(mvdeoId,personas);
    const infoDep = getCensadosPorDepByUsuario(personas,departamentos)
    const infoOcu = getCensadosPorOcByUsuario(personas,ocupaciones);

    const reports = [
        {
            title: "Censados totales",
            description: "Cantidad de personas censadas en Montevideo y en el interior",
            chartinfo: infoTotales,
            errorCard: infoTotales == 'ERROR' ? true : false
        },
        {
            title: "Censados por departamento",
            description: "Cantidad de personas por departamento",
            chartinfo: infoDep,
            errorCard: infoDep == 'ERROR' ? true : false

        },
         {
            title: "Censados por ocupacion",
            description: "Cantidad de personas censadas por ocupacion",
            chartinfo: infoOcu,
            errorCard: infoOcu == 'ERROR' ? true : false

        },
    ];


    return (
        
        <div className="row mt-4">
            {reports.map(report => {
               return <Card key={report.title.toLowerCase().replace(' ','-')} infoCard={report}></Card>
            })}
        </div>
    );
};

const getCensadosTotales = (idMontevideo,personas) => {
    let montevideanos = 0;
    let delInterior = 0;

    personas.forEach(persona => {
        if(persona.departamento==idMontevideo) montevideanos++;
        else delInterior++;
    });

  
    let infoTotales = {
        data: {
            labels: ['Montevideo','Interior'],
            datasets: [
                {
                    label: 'Censados totales',
                    data: [montevideanos,delInterior],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        },
        type: 'doughnut'
    };
    if(!personas || !personas.length){
        infoTotales = 'ERROR';
    }


    return infoTotales;
}

const getCensadosPorDepByUsuario = (personas,departamentos) => {
    const dataValues = departamentos.map(dep => getCantidadByProp(personas,dep.id,'departamento'))

    let infoPorDepto = {
        data : {
            labels: departamentos.map(dep => dep.nombre),
            datasets: [
                {
                    label: 'Censados',
                    data: dataValues,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                },
            ],
            

        }, 
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        userCallback(label, index, labels) {
                           if (Math.floor(label) === label) {
                               return label;
                           }
                        },
                    }
                },
            },
            indexAxis: 'y',
          
        },
            
        type: "bar"
    };

    if(!personas || !personas.length || !departamentos || !departamentos.length){
        infoPorDepto = 'ERROR';
    }

    return infoPorDepto;  
}

const getCensadosPorOcByUsuario = (personas,ocupaciones) => {
    const values = ocupaciones.map(ocu => getCantidadByProp(personas,ocu.id,'ocupacion'));
    let infoPorOcu = {
        data : {
            labels: ocupaciones.map(ocu => ocu.ocupacion),
            datasets: [
            {
                label: 'Censados',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(6,144,143, 0.2)',
                  ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(6,144,143,1)',
                   
                ],
                borderWidth: 1,
            },
            ],
        },
        type: "pie"
    };

    if(!personas || !personas.length || !ocupaciones || !ocupaciones.length){
        infoPorOcu = 'ERROR';
    }

    return infoPorOcu;  
}

const getCantidadByProp = (personas,id,prop) => {
    let cantidad = 0;
    personas.forEach(p => {
        if(id == p[prop]) cantidad++;
    });
    return cantidad;
}

export default ChartReports;
