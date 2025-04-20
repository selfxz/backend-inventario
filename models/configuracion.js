const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Configuracion = sequelize.define('configuracion', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    whatsapp: { type: DataTypes.STRING, allowNull: false },
    mensaje_personalizado: { type: DataTypes.TEXT }
}, { tableName: 'configuracion', timestamps: false });

module.exports = Configuracion;