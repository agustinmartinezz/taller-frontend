import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Card.css';
import Chart from './Chart';


const Card = ({infoCard}) => {
    return (
        <div className="col-lg-4 col-md-6 mt-4 mb-4">
            <div className="card z-index-2 ">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                        { 
                        infoCard.errorCard ? 
                        <div className="alert alert-warning" role="alert">
                            No tienes suficientes datos para cargar esta gráfica. Prueba explorando mas funciones en el dashboard .
                        </div> 
                        :
                        <div className="chart">
                            <Chart chartProps={infoCard.chartinfo}/>
                        </div>
                        }
                    </div>
                </div>
                <div className="card-body">
                    <h6 className="mb-0 ">{infoCard.title}</h6>
                    <hr className="dark horizontal" />
                    <div className="d-flex ">
                        <i className="material-icons text-sm my-auto me-1"></i>
                        <p className="mb-0 text-sm">{infoCard.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
