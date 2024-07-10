const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

const {mongoose} = require('./database');

app.set('port', process.env.PORT || 3000);

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

// Rutas de nuestro servidor
app.use('/api/patients', verifyToken, require('./routes/patient.route'));
app.use('/api/doctors', require('./routes/doctor.route'));
app.use('/api/specialities', require('./routes/speciality.route'));
app.use('/api/users', require('./routes/user.route'));
app.use('/api/appointments', require('./routes/appointment.route'));

app.use('/api/auth', require('./routes/auth.route'))

function verifyToken(req, res, next) {
    console.log(req.headers.authorization)
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    const token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }
    const payload = jwt.verify(token, 'secretKey')
    req.userId = payload._id;
    next();
}

// Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log('server activo en el puerto', app.get('port'));
});
