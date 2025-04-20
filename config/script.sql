-- para mysql
-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS tienda_online;
USE tienda_online;

-- Tabla de Usuarios (Contraseña será hasheada con bcrypt)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Configuración (Ejemplo: WhatsApp de contacto)
CREATE TABLE configuracion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    whatsapp VARCHAR(20) NOT NULL,
    mensaje_personalizado TEXT
);

-- Tabla de Categorías (Para organizar productos)
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Productos (Vinculada a categorías)
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    marca VARCHAR(100) NOT NULL,
    categoria_id INT,
    imagen_url VARCHAR(255),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
);




-- para sql

-- Crear la base de datos si no existe (en SQL Server no se puede usar IF NOT EXISTS directamente así)
IF DB_ID('tienda_online') IS NULL
    CREATE DATABASE tienda_online;
GO

USE tienda_online;
GO

-- Tabla de Usuarios
IF OBJECT_ID('usuarios', 'U') IS NULL
CREATE TABLE usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    password NVARCHAR(255) NOT NULL,
    creado_en DATETIME DEFAULT GETDATE()
);
GO

-- Tabla de Configuración
IF OBJECT_ID('configuracion', 'U') IS NULL
CREATE TABLE configuracion (
    id INT IDENTITY(1,1) PRIMARY KEY,
    whatsapp NVARCHAR(20) NOT NULL,
    mensaje_personalizado NVARCHAR(MAX)
);
GO

-- Tabla de Categorías
IF OBJECT_ID('categorias', 'U') IS NULL
CREATE TABLE categorias (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) UNIQUE NOT NULL,
    descripcion NVARCHAR(MAX),
    creado_en DATETIME DEFAULT GETDATE()
);
GO

-- Tabla de Productos
IF OBJECT_ID('productos', 'U') IS NULL
CREATE TABLE productos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(150) NOT NULL,
    descripcion NVARCHAR(MAX),
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    marca NVARCHAR(100) NOT NULL,
    categoria_id INT NULL,
    imagen_url NVARCHAR(255),
    creado_en DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
        ON DELETE SET NULL
);
GO
