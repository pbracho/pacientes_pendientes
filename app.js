/**
 * Módulo principal de la Aplicación
 * @module app
 */

/** Carga e inicializa  el modulo dotenv si se usan archivos .env, y en entorno de producción */
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

/** Carga las constantes o datos de configuración a ser usados por la app */
const config = require('./config');

/** Para permitir las peticiones cross origin */
const cors = require('cors');

/** Carga el módulo /network/routes que manejara el enrutado de la app */
const router = require('./network/routes');

/** Carga el módulo db para conectar con la base de datos */
const db = require('./db');
db(config.dbUrl);

/** Carga el módulo express */
const express = require('express');
/** crea e inicializa el objeto express en app*/
const app = express();

/** indica los paquetes y configuraciones a utilizar por la app y la ruta de páginas estáticas */
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(config.publicRoute, express.static('./public'));

/** Pasa la app al módulo router para que gestione las rutas y peticiones */
router(app);

/** Inicia el servidor */
app.listen(config.port, () => {
    console.log(`[Servidor] Iniciado, escuchando en ${config.host}:${config.port}`);
})
