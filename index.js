require('dotenv').config();
const express = require('express');
const cors = require('cors');

const db = require('./config/db.config.js');
const router = require('./routes/router.js');

// Sincronizar la base de datos
db.sequelize.sync().then(() => {
  console.log('Base de datos sincronizada correctamente.');
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Reemplaza body-parser

// Rutas
app.use('/api', router);

// Ruta inicial
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido Estudiantes de UMG' });
});

// Configurar el puerto
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
