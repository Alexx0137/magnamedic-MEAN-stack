const User = require('../models/user');
const authCtrl = {};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

authCtrl.register = async (req, res) => {
    const {email, password} = req.body;
    const newUser = new User({email, password});
    await newUser.save();

    const token = jwt.sign({_id: newUser._id}, 'secretKey')
    res.status(200).json({token})

}

authCtrl.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json("El email no existe");

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json("Contraseña incorrecta");

    const token = jwt.sign({ _id: user._id }, 'secretKey');
    return res.status(200).json({ token });
};



module.exports = authCtrl;