import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import AppContext from '../context/AppContext';
import '../styles/components/Payment.css';

const Payment = () => {
    const { state: { cart, buyer }, addNewOrder } = useContext(AppContext);
    const paypalOptions = {
        clientId: 'AbCIMamH90ksPIAZ1gszGJ7KYOc7M4SK5BrA3lBsV-ZEb1NH6HmvBdPRkws1_vStoiKkxrC-bOiWpCb6',
        intent: 'capture',
        currency: 'USD'
    };
    const buttonStyles = {
        layout: 'vertical',
        shape: 'rect'
    };

    const navigate = useNavigate();

    const handleSumTotal = () => {
        const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
        const sum = cart.reduce(reducer, 0);
        return sum;
    };

    const handlePaymentSuccess = data => {
        console.log(buyer);
        if (data.status === 'COMPLETED') {
            const newOrder = {
                buyer,
                products: cart,
                payment: data,
            };
            addNewOrder(newOrder);
            console.log(newOrder);
            navigate('/checkout/success');
        }
    };

    return(
       <div className="Payment">
           <div className="Payment-content">
               <h3>Resumen del pedido:</h3>
               { cart.map(item => (
                   <div className="Payment-item" key={ item.title }>
                       <div className="Payment-element">
                            <h4>{ item.title }</h4>
                            <span>
                                $
                                {' '}
                                { item.price }
                            </span>
                       </div>
                   </div>
               )) }
               <button onClick={ () => {handlePaymentSuccess({ status: 'COMPLETED' })} }>Pagar</button>
               <div className="Payment-button">
                   <PayPalButton
                    paypalOptions={paypalOptions}
                    buttonStyles={buttonStyles}
                    amount={handleSumTotal()}
                    onSuccess={data => handlePaymentSuccess(data) }
                    onError={error => console.log('error', error) }
                    onCancel={data => console.log('cancel', data) }
                   />
               </div>
           </div>
       </div>
    )
}

export default Payment;