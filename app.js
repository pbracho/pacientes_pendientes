// Inicializamos el uso del archivo .env
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// cargamos las constantes o datos de confirguración a ser usados
const config = require('./config');

// para permitir las peticiones cross origin
const cors = require('cors');

// cargamos el manejador de rutas
const router = require('./network/routes');

// Cargamos el manejador de base de datos y nos conectamos
const db = require('./db');
db(config.dbUrl);

const express = require('express');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(config.publicRoute, express.static('./public'));

// pasamos la app como parametro para cargar el server y pasar las rutas
router(app);

app.listen(config.port, () => {
    console.log(`[Servidor] Iniciado, escuchando en ${config.host}:${config.port}`);
})
