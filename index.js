require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Inicializar Stripe

const db = require('./config/db.config.js');
const router = require('./routes/router.js');

// Resync DB (solo para desarrollo, cuidado con force: true en producción)
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync with { force: true }');
});

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/', router);

// Ruta inicial
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido Estudiantes de UMG" });
});

// Ruta para crear PaymentIntent
app.post('/api/payment-intent', async (req, res) => {
  try {
    const { amount, currency } = req.body; // Recibe el monto y la moneda del cliente

    if (!amount || !currency) {
      return res.status(400).json({ error: 'El monto y la moneda son requeridos.' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'], // Métodos de pago disponibles
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error al crear PaymentIntent:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Configurar el puerto
const PORT = process.env.PORT || 8081;

// Crear el servidor
const server = app.listen(PORT, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});