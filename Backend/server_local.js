require('dotenv').config();
const blockchainRoutes = require('./routes/blockchainRoutes');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { v2: cloudinary } = require("cloudinary");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Importar rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const votacionRoutes = require('./routes/votacionRoutes');
const invitacionRoutes = require('./routes/invitacionRoutes');
const opcionRoutes = require('./routes/opcionRoutes');
const votoRoutes = require('./routes/votoRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Conectar a MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:admin@129.146.38.202:27017/votechainDBtest?authSource=admin';

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error en MongoDB:", err));

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configurar almacenamiento en Cloudinary para multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "votaciones", // Carpeta en Cloudinary
    format: async () => "png",
    public_id: (req, file) => file.originalname.split(".")[0], // Nombre del archivo
  },
});

const upload = multer({ storage });

// Pasar `upload` a las rutas para que puedan recibir imágenes
app.use((req, res, next) => {
  req.upload = upload;
  next();
});

// Rutas
app.use(usuarioRoutes);
app.use(votacionRoutes);
app.use(invitacionRoutes);
app.use(opcionRoutes);
app.use(votoRoutes);
app.use(blockchainRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
