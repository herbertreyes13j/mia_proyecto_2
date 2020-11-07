"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const realizarexamen_Controller_1 = require("../controllers/realizarexamen.Controller");
class RealizarExamenRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/preguntas/:idexamen', realizarexamen_Controller_1.realizarexamenController.getpreguntas);
        this.router.get('/respuestas/:idpregunta', realizarexamen_Controller_1.realizarexamenController.getrespuestas);
        this.router.post('/salausuario', realizarexamen_Controller_1.realizarexamenController.insertarestudiantesala);
        this.router.post('/actualizarnota', realizarexamen_Controller_1.realizarexamenController.actualizarnota);
        this.router.get('/getmisala/:idusuario', realizarexamen_Controller_1.realizarexamenController.getsalas);
        this.router.get('/notas/:sala', realizarexamen_Controller_1.realizarexamenController.getnotas);
    }
}
const realizarexamenroutes = new RealizarExamenRoutes();
exports.default = realizarexamenroutes.router;
