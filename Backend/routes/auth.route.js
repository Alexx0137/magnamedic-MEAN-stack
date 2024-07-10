const express = require('express');
const router = express.Router();

const User = require('../models/user');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send('Hola desde auth');
})

router.post('/register', async (req, res) => {
    const {email, password} = req.body;
    const newUser = new User({email, password});
    await newUser.save();

    const token = jwt.sign({_id: newUser._id}, 'secretKey')
    res.status(200).json({token})

})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if (!user) return res.status(401).send("El email no existe");
    if (user.password !== password) return res.status(401).send("Contraseña incorrecta");

    const token = jwt.sign({_id: user._id}, 'secretKey');
    return res.status(200).json({token})
});


module.exports = router;