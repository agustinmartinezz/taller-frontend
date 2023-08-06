import React from 'react';
import "../styles/Chart.css";


import { Doughnut,Bar,Pie } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Chart = ({chartProps}) => {
    let component;
    switch (chartProps.type) {
        case 'bar':
            component = <Bar {...chartProps}/>
            break;
        case 'doughnut':
            component = <Doughnut {...chartProps}/>
            break;
        case 'pie':
            component = <Pie {...chartProps}/>
            break;
    }

    return (
        component
    );
};

export default Chart;
