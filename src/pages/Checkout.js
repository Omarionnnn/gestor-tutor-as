import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import supabase from '../supabaseClient';
import '../styles/Checkout.css';
import { useUnicoins } from '../context/UnicoinsContext';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function Checkout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [cart, setCart] = useState([]);
    const { unicoins, setUnicoins } = useUnicoins();

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        if (location.state && location.state.cart) {
            setCart(location.state.cart);
        } else {
            navigate('/store');
        }
    }, [location, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            alert('Stripe no está listo aún.');
            return;
        }

        const totalUnicoins = cart.reduce((sum, item) => sum + item.unicoins, 0);

        try {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error || !user) {
                throw new Error('Por favor, inicie sesión para continuar.');
            }

            const userId = user.id;

            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('fullname, email, unicoins')
                .eq('id', userId)
                .single();

            if (profileError) {
                throw new Error('Error al obtener el perfil del usuario.');
            }

            const cardElement = elements.getElement(CardElement);

            // Crear el método de pago con Stripe
            const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (paymentError) {
                throw new Error('Error al procesar el método de pago: ' + paymentError.message);
            }

            // Crear Payment Intent
            const response = await fetch('http://localhost:5001/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: totalUnicoins * 100 }),
            });

            const { clientSecret } = await response.json();

            // Confirmar el pago
            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (confirmError) {
                throw new Error('Error al confirmar el pago: ' + confirmError.message);
            }

            // Actualizar los Unicoins en Supabase
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ unicoins: profile.unicoins + totalUnicoins })
                .eq('id', userId);

            if (updateError) {
                throw new Error('Error al actualizar los Unicoins.');
            }

            setUnicoins(profile.unicoins + totalUnicoins);
            alert('Compra completada con éxito.');
            navigate('/store');
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };

    return (
        <div className="checkout-container">
            <h2>Completar Compra</h2>
            <div className="checkout-details">
                <h3>Productos en el Carrito</h3>
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                            <strong>{item.title}</strong> - {item.description} - {item.unicoins} Unicoins
                        </li>
                    ))}
                </ul>
                <p><strong>Total:</strong> {cart.reduce((sum, item) => sum + item.unicoins, 0)} Unicoins</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre Completo</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <CardElement />
                </div>
                <button type="submit" className="checkout-button" disabled={!stripe}>Confirmar Compra</button>
            </form>
        </div>
    );
}

export default Checkout;
