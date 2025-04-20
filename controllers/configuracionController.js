const Configuracion = require('../models/configuracion');

exports.getConfiguracion = async (req, res) => {
    const configuracion = await Configuracion.findOne({ where: { id: 1 } });
    res.json(configuracion);
};

exports.updateConfiguracion = async (req, res) => {
    await Configuracion.update(req.body, { where: { id: 1 } });
    res.json({ mensaje: 'Configuración actualizada con éxito' });
};
