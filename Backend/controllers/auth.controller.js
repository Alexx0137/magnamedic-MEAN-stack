const User = require('../models/user');
const authCtrl = {};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Crear un nuevo usuario.
 * @returns {Object} Mensaje de éxito o error.
 * @author Nelson García
 */
authCtrl.register = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({ ...req.body, password: hashedPassword });
        await user.save();
        res.status(201).json({
            status: 'success',
            message: 'Usuario creado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al crear el usuario: ' + error.message
        });
    }
};

/**
 * Autenticar un usuario.
 * @returns {Object} Token JWT si la autenticación es exitosa, o mensaje de error.
 * @author Nelson García
 */
authCtrl.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "El email no existe" });

    // Comparar la contraseña hasheada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ _id: user._id }, 'secretKey');
    return res.status(200).json({
        token,
        user: {
            name: user.name,
            last_name: user.last_name
        }
    });
};


module.exports = authCtrl;
