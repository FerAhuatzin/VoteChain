const express = require("express");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const {
  crearVotacion,
  obtenerVotaciones,
  actualizarVotacion,
  eliminarVotacion,
} = require("../controllers/votacionController");

const router = express.Router();

// Configurar almacenamiento en Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "votaciones",
    format: async () => "png",
    public_id: (req, file) => file.originalname.split(".")[0],
  },
});

const upload = multer({ storage });

// Middleware para validar ObjectId en MongoDB
const validarId = (req, res, next) => {
  const { id } = req.params;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: "ID inválido" });
  }
  next();
};

// Definir rutas con validación de ID cuando sea necesario
router.post("/crear-votacion", upload.single("imagen"), crearVotacion);
router.get("/obtener-votaciones", obtenerVotaciones);
router.put("/actualizar-votacion/:id", validarId, upload.single("imagen"), actualizarVotacion);
router.delete("/eliminar-votacion/:id", validarId, eliminarVotacion);

module.exports = router;
