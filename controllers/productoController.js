const Producto = require("../models/productos");
const Categoria = require("../models/categoria");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 📌 Configuración de almacenamiento para imágenes
const storage = multer.diskStorage({
    destination: "./uploads/", // 📂 Carpeta donde se guardan las imágenes
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Renombrar archivo
    }
});

// 📌 Filtrar archivos para permitir solo imágenes (PNG, JPG, JPEG)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Formato de imagen no permitido"), false);
    }
};

// 📌 Middleware de subida de imágenes con filtros
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter 
});

// 📌 Obtener todos los productos con su categoría
exports.getProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            include: [{ model: Categoria, as: "Categoria" }] 
        });
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos", details: error.message });
    }
};
// 📌 Crear un producto (Acepta imagen opcional)
exports.createProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, marca, categoria_id } = req.body;
        const imagen_url = req.file ? req.file.filename : null;


        const nuevoProducto = await Producto.create({
            nombre,
            descripcion,
            precio,
            stock,
            marca,
            categoria_id,
            imagen_url,
        });

        res.json(nuevoProducto);
    } catch (error) {
        console.error("❌ Error al crear el producto:", error);
        res.status(500).json({ error: "Error al crear el producto" });
    }
};

exports.updateProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, marca, categoria_id } = req.body;
        const id = req.params.id;

        // Buscar producto actual para saber si tenía imagen vieja
        const productoActual = await Producto.findByPk(id);

        let nuevaImagen = productoActual.imagen_url; // Por defecto se mantiene la anterior

        if (req.file) {
            // Si se subió una nueva imagen, usamos esa
            nuevaImagen = req.file.filename;

            // 🧽 Borra la imagen anterior si existía
            if (productoActual.imagen_url) {
                const rutaVieja = path.join(__dirname, "..", "uploads", productoActual.imagen_url);
                if (fs.existsSync(rutaVieja)) {
                    fs.unlinkSync(rutaVieja);
                }
            }
        }

        await Producto.update(
            {
                nombre,
                descripcion,
                precio,
                stock,
                marca,
                categoria_id,
                imagen_url: nuevaImagen,
            },
            { where: { id } }
        );

        res.json({ mensaje: "Producto actualizado correctamente" });
    } catch (error) {
        console.error("❌ Error al actualizar el producto:", error);
        res.status(500).json({ mensaje: "Error al actualizar el producto", error });
    }
};

// 📌 Eliminar un producto
exports.deleteProducto = async (req, res) => {
    try {
        await Producto.destroy({ where: { id: req.params.id } });
        res.json({ mensaje: "Producto eliminado" });
    } catch (error) {
        console.error("❌ Error al eliminar el producto:", error);
        res.status(500).json({ error: "Error al eliminar producto" });
    }
};

exports.upload = upload; // Exportar middleware de subida de imágenes
