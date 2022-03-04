import React, { useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useHistory
import AppContext from '../context/AppContext';
import '../styles/components/Information.css';

const Information = () => {
    const { state: { cart }, addToBuyer } = useContext(AppContext);
    const form = useRef(null);
    const navigate = useNavigate();
    console.log('history', history);
    const handleSubmit = () => {
        const formData = new FormData(form.current);
        const buyer = {
            'name': formData.get('name'),
            'email': formData.get('email'),
            'address': formData.get('address'),
            'apto': formData.get('apto'),
            'city': formData.get('city'),
            'country': formData.get('country'),
            'state': formData.get('state'),
            'cp': formData.get('cp'),
            'phone': formData.get('phone'),
        };
        addToBuyer(buyer);
        navigate('/checkout/payment');
    };

    return(
        <div className="Information">
            <div className="Information-content">
                <div className="Information-head">
                    <h2>Información de contacto:</h2>
                </div>
                <div className="Information-form">
                    <form ref={ form }>
                        <input type="text" placeholder="Nombre Completo" name="name" value="javier araujo" />
                        <input type="text" placeholder="Correo electrónico" name="email" value="javieraraujo@gmail.com" />
                        <input type="text" placeholder="Dirección" name="address" value="Prolongación La Mar 672 La Victoria Lima Peru" />
                        <input type="text" placeholder="Apto" name="apto" value="Lima" />
                        <input type="text" placeholder="Ciudad" name="city" value="Lima" />
                        <input type="text" placeholder="País" name="country" value="Perú" />
                        <input type="text" placeholder="Estado" name="state" value="Lima" />
                        <input type="text" placeholder="Código Postal" name="cp" value="Lima1" />
                        <input type="text" placeholder="Teléfono" name="phone" value="964375869" />
                    </form>
                </div>
                <div className="Information-buttons">
                    <div className="Information-back">
                        <Link to="/checkout">
                            Regresar
                        </Link>
                    </div>
                    <div className="Information-next">
                        <button type="button" onClick={ handleSubmit }>Pagar</button>
                    </div>
                </div>
            </div>
            <div className="Information-sidebar">
                <h3>Pedido:</h3>
                { cart.map(item => (
                    <div key={ item.title } className="Information-item">
                <div className="Information-element">
                    <h4>{ item.title }</h4>
                    <span>$ { item.price }</span>
                </div>
            </div>
                )) }
            </div>
        </div>
    )
}

export default Information;