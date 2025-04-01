const express = require("express");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const {
  crearVotacion,
  obtenerVotaciones,
  actualizarVotacion,
  eliminarVotacion,
  obtenerVotacionPorId,
  obtenerVotacionesPorCategoria,
  obtenerVotacionesCreadasPorUsuario,
  obtenerVotacionesVotadasPorUsuario,
} = require("../controllers/votacionController");
const validarId = require("../commonMiddlewares/idValidation")
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



// Definir rutas con validación de ID cuando sea necesario
router.post("/crear-votacion", upload.single("imagen"), crearVotacion);
router.get("/obtener-votaciones", obtenerVotaciones);
router.put("/actualizar-votacion/:id", validarId, upload.single("imagen"), actualizarVotacion);
router.delete("/eliminar-votacion/:id", validarId, eliminarVotacion);
router.get("/obtener-votacion/:id", validarId, obtenerVotacionPorId);
router.get("/obtener-votaciones-por-categoria/:categoria", obtenerVotacionesPorCategoria);
router.get("/obtener-votaciones-creadas-por-usuario/:id", validarId, obtenerVotacionesCreadasPorUsuario);
router.get("/obtener-votaciones-votadas-por-usuario/:id", validarId, obtenerVotacionesVotadasPorUsuario);

module.exports = router;
