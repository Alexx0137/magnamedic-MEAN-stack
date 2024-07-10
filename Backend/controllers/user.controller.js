const User = require('../models/user');
const userCtrl = {};


/**
 * Obtener todos los usuarios.
 * @route GET /api/users
 * @returns {Array} Lista de usuarios.
 * @author Nelson García
 */
userCtrl.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener los usuarios: ' + error.message
        });
    }
}

/**
 * Crear un nuevo usuario.
 * @route POST /api/users
 * @param {Object} req.body - Datos del nuevo usuario.
 * @returns {Object} Mensaje de éxito.
 * @author Nelson García
 */
userCtrl.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
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
 * Obtener un único usuario por ID.
 * @route GET /api/users/:id
 * @param {String} req.params.id - ID del usuario.
 * @returns {Object} Datos del usuario.
 * @author Nelson García
 */
userCtrl.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || id === 'null') {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user: ' + error.message });
    }
};

/**
 * Actualizar un usuario existente.
 * @route PUT /api/users/:id
 * @param {String} req.params.id - ID del usuario.
 * @param {Object} req.body - Datos actualizados del usuario.
 * @returns {Object} Mensaje de éxito y datos del usuario actualizado.
 * @author Nelson García
 */
userCtrl.updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id || id === 'null') {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        Object.assign(user, req.body);
        const updatedUser = await user.save();

        res.json({
            status: 'success',
            message: 'Usuario actualizado exitosamente',
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al actualizar el usuario: ' + error.message
        });
    }
};

/**
 * Eliminar un usuario por ID.
 * @route DELETE /api/users/:id
 * @param {String} req.params.id - ID del usuario.
 * @returns {Object} Mensaje de éxito.
 * @author Nelson García
 */
userCtrl.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({
            status: 'success',
            message: 'Usuario eliminado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar el usuario: ' + error.message
        });
    }
};

module.exports = userCtrl;
