const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

exports.getUsuarios = async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
};

exports.createUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = await Usuario.create({ nombre, email, password: hashedPassword });
    res.json(nuevoUsuario);
};

exports.updateUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await Usuario.update({ nombre, email, password: hashedPassword }, { where: { id: req.params.id } });
    res.json({ mensaje: 'Usuario actualizado' });
};

exports.deleteUsuario = async (req, res) => {
    await Usuario.destroy({ where: { id: req.params.id } });
    res.json({ mensaje: 'Usuario eliminado' });
};