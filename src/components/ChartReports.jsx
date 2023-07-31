import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Card.css';
import Card from './Card';


const ChartReports = () => {

    // Censados totales
    // Grafico de personas por departamento	
    // Grafico de personas por ocupacion	

    const infoTotales = {
        data: {
            labels: ['Montevideo','Interior'],
            datasets: [
                {
                    label: 'Censados totales',
                    data: [3000,17000],
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
    const infoDep = infoTotales;
    const infoOcu = infoTotales;

    const reports = [
        {
            title: "Censados totales",
            description: "Cantidad de personas censadas en Montevideo y en el interior",
            chartinfo: infoTotales
        },
         {
            title: "Censados por departamento",
            description: "Cantidad de personas por departamento",
            chartinfo: infoDep
        },
         {
            title: "Censados por ocupacion",
            description: "Cantidad de personas censadas por ocupacion",
            chartinfo: infoOcu
        },
    ];


    return (
        
        <div className="row mt-4">
            {reports.map(report => {
               return <Card key={report.title.toLocaleLowerCase().replace(' ','-')} infoCard={report}></Card>
            })}
        </div>
    );
};

export default ChartReports;
