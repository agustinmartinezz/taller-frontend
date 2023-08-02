import React from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import { Doughnut,Bar,Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

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
