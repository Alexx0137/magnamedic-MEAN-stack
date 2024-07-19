const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const {mongoose} = require('./database');

app.set('port', process.env.PORT || 3000);

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Rutas del servidor
app.use('/api/patients', require('./middlewares/auth.middleware').verifyToken, require('./routes/patient.route'));
app.use('/api/doctors', require('./middlewares/auth.middleware').verifyToken, require('./routes/doctor.route'));
app.use('/api/specialities', require('./middlewares/auth.middleware').verifyToken, require('./routes/speciality.route'));
app.use('/api/users', require('./middlewares/auth.middleware').verifyToken, require('./routes/user.route'));
app.use('/api/appointments', require('./middlewares/auth.middleware').verifyToken, require('./routes/appointment.route'));
app.use('/api/reports', require('./middlewares/auth.middleware').verifyToken, require('./routes/report.route'));

app.use('/api/auth', require('./routes/auth.route'))

app.listen(app.get('port'), () => {
    console.log('server activo en el puerto', app.get('port'));
});