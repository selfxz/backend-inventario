const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Categoria = require("./categoria");

const Producto = sequelize.define("productos", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT },
    precio: { type: DataTypes.FLOAT, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    imagen_url: { type: DataTypes.TEXT }, // 📌 Para almacenar rutas de imágenes
    marca: { type: DataTypes.STRING, allowNull: false },
    categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categoria,
            key: "id_categoria",
        },
    },
}, { timestamps: false });

// 🔗 Definir relaciones
Producto.belongsTo(Categoria, { foreignKey: "categoria_id", as: "Categoria" });
Categoria.hasMany(Producto, { foreignKey: "categoria_id", as: "Productos" });

module.exports = Producto;
