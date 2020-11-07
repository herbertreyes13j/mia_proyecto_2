"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estadisticas_Controller_1 = require("../controllers/estadisticas.Controller");
class EstadisticaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/estadistica1/:ciencia', estadisticas_Controller_1.estadisticaController.getestadistica1);
        this.router.get('/estadistica2/:ciencia', estadisticas_Controller_1.estadisticaController.getestadistica2);
        this.router.get('/estadistica3', estadisticas_Controller_1.estadisticaController.getestadistica3);
        this.router.get('/estadistica4general', estadisticas_Controller_1.estadisticaController.getestadistica4general);
        this.router.get('/estadistica4/:ciencia', estadisticas_Controller_1.estadisticaController.getestadistica4);
        this.router.get('/estadistica5general', estadisticas_Controller_1.estadisticaController.getestadistica5general);
        this.router.get('/estadistica5/:ciencia', estadisticas_Controller_1.estadisticaController.getestadistica5);
    }
}
const estadisticaroutes = new EstadisticaRoutes();
exports.default = estadisticaroutes.router;
