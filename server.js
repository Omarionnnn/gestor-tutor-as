const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Stripe = require('stripe');

// Usa tu clave secreta de Stripe aquí
const stripe = Stripe('sk_test_51QRZqOA9NEVKqo7skw8FUXtb9AvagVCmWaCGrzFlr0sZBOgCuWUjFMi9OSMeBsQdCIxaSix0M362ClvUeYVIDLIG00YDTVkeVl');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Ruta para crear un Payment Intent
app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body; // Recibe el monto en centavos (ejemplo: 1000 = 10.00)

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'eur', // Cambia esto si necesitas otra moneda
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});

// Servidor escuchando en el puerto 5000
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
