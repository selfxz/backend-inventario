const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const multer = require('multer');
const path = require('path');

// 📌 Configuración de `multer` para subir imágenes
const storage = multer.diskStorage({
    destination: './uploads/', // Carpeta donde se guardarán las imágenes
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único
    }
});
const upload = multer({ storage: storage });

router.get('/', productoController.getProductos);
router.post('/', upload.single('imagen'), productoController.createProducto);
router.put('/:id', upload.single('imagen'), productoController.updateProducto);
router.delete('/:id', productoController.deleteProducto);

module.exports = router;
