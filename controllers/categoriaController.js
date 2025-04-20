const Categoria = require('../models/categoria');

exports.getCategorias = async (req, res) => {
    const categorias = await Categoria.findAll();
    res.json(categorias);
};

exports.createCategoria = async (req, res) => {
    const nuevaCategoria = await Categoria.create(req.body);
    res.json(nuevaCategoria);
};

exports.updateCategoria = async (req, res) => {
    await Categoria.update(req.body, { where: { id: req.params.id } });
    res.json({ mensaje: 'Categoría actualizada' });
};

exports.deleteCategoria = async (req, res) => {
    await Categoria.destroy({ where: { id: req.params.id } });
    res.json({ mensaje: 'Categoría eliminada' });
};
