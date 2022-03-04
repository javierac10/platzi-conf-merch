import React, { useContext } from 'react';
import Map from '../components/Map';
import AppContext from '../context/AppContext';
import '../styles/components/Success.css';
import useGoogleAddress from '../hooks/useGoogleAddress';

const Success = () => {
    const { state: { buyer } } = useContext(AppContext);

    console.log('address', buyer[0].address);
    const location = useGoogleAddress(buyer[0].address);
    console.log('location', location);
    return(
        <div className="Success">
            <div className="Success-content">
                <h2>{ buyer[0].name }, Gracias por tu compra</h2>
                <span>Tu pedido llegará en 3 días a tu casa</span>
                <div className="Success-map">
                    <Map data={ location } />
                </div>
            </div>
        </div>
    )
}

export default Success;