const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database');
const productoRoutes = require('./routes/productos');
const categoriaRoutes = require('./routes/categorias');
const usuarioRoutes = require('./routes/usuarios');
const configuracionRoutes = require('./routes/configuracion');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
app.use(cors());

// 📌 Permitir acceso a imágenes (Muy importante para que se vean en el frontend)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔹 Aumenta el tamaño del JSON permitido a 50MB
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// 🛠️ Rutas protegidas con autenticación
app.use('/productos', authMiddleware, productoRoutes);
app.use('/categorias', authMiddleware, categoriaRoutes);
app.use('/usuarios', authMiddleware, usuarioRoutes);
app.use('/configuracion', authMiddleware, configuracionRoutes);
app.use('/auth', authRoutes);

// 📌 Conexión a la base de datos
sequelize.sync()
    .then(() => console.log('✅ Base de datos conectada'))
    .catch(err => console.error('❌ Error:', err));

// 📌 Arrancar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
