require('dotenv').config(); // 👈 Esto carga las variables del .env

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "secreto_por_defecto";

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(403).json({ error: 'Acceso denegado' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
};

module.exports = authMiddleware;