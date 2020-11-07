"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariocrudController_1 = require("../controllers/usuariocrudController");
class UsuarioCrudRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', usuariocrudController_1.usuarioCrudController.insertarusuario);
        this.router.post('/carrera/', usuariocrudController_1.usuarioCrudController.insertarusuariocarrera);
        this.router.post('/rol/', usuariocrudController_1.usuarioCrudController.insertarusuariorol);
        this.router.get('/:correo', usuariocrudController_1.usuarioCrudController.getusuarioid);
        this.router.get('/diferente/:id', usuariocrudController_1.usuarioCrudController.getusuariodiferente);
    }
}
const usuariocrudroutes = new UsuarioCrudRoutes();
exports.default = usuariocrudroutes.router;
