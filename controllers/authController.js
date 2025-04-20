/* require('dotenv').config(); // 👈 Esto carga las variables del .env
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

const SECRET_KEY = process.env.JWT_SECRET || 'secreto_super_seguro';

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const validPassword = await bcrypt.compare(password, usuario.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ id: usuario.id, email: usuario.email }, SECRET_KEY, { expiresIn: '2h' });

        res.json({
            token,
            user: { id: usuario.id, name: usuario.nombre, email: usuario.email }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};


module.exports = { login }; */

require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

const SECRET_KEY = process.env.JWT_SECRET || 'secreto_super_seguro';

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const validPassword = await bcrypt.compare(password, usuario.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Opcional: eliminar el password antes de enviar la respuesta
    const { password: _, ...userData } = usuario.toJSON();

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    res.json({
      mensaje: "✅ Login exitoso",
      token,
      usuario: userData
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = { login };
