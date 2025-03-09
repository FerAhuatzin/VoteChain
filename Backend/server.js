require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuarioRoutes');
const votacionRoutes = require('./routes/votacionRoutes');
const invitacionRoutes = require('./routes/invitacionRoutes');
const opcionRoutes = require('./routes/opcionRoutes');
const votoRoutes = require('./routes/votoRoutes');

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:admin@129.146.38.202:27017/votechainDBtest?authSource=admin';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
}).then(() => console.log("✅ Conectado a MongoDB"))
.catch(err => console.error("❌ Error al conectar a MongoDB:", err));

app.use(usuarioRoutes);
app.use(votacionRoutes);
app.use(invitacionRoutes);
app.use(opcionRoutes);
app.use(votoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor corriendo en http://129.146.38.202:${PORT}`);
});
