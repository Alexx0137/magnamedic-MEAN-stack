const express = require('express'); // Importa el framework Express
const morgan = require('morgan'); // Importa el middleware morgan para el registro de solicitudes HTTP
const cors = require('cors'); // Importa el middleware cors para habilitar CORS (Cross-Origin Resource Sharing)

const app = express(); // Crea una instancia de la aplicación Express

const { mongoose } = require('./database'); // Importa la conexión a la base de datos desde el archivo database.js

/**
 * Se crea una REST API, es la manera de decirle al servidor que reciba y envíe datos
 */

// Configuraciones
app.set('port', process.env.PORT || 3000); // Establece el puerto en el que la aplicación escuchará, por defecto el 3000

// Middleware
app.use(morgan('dev')); // Usa morgan para registrar las solicitudes en modo 'dev'
app.use(express.json()); // Usa express.json() para analizar las solicitudes JSON
app.use(cors({origin: 'http://localhost:4200'})); // Usa cors para permitir solicitudes desde http://localhost:4200

// Rutas de nuestro servidor
app.use('/api/patients', require('./routes/patient.route')); // Define la ruta para /api/patients y usa el archivo de rutas patient.routes

// Iniciando el servidor
app.listen(app.get('port'), () => { // Inicia el servidor en el puerto configurado
    console.log('server activo en el puerto', app.get('port')); // Imprime un mensaje indicando que el servidor está activo
});
