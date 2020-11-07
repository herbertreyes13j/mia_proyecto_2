"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pregunta_Controller_1 = require("../controllers/pregunta.Controller");
class PreguntaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', pregunta_Controller_1.preguntaController.insertarpregunta);
        this.router.get('/last', pregunta_Controller_1.preguntaController.getlastinsertada);
        this.router.post('/respuesta', pregunta_Controller_1.preguntaController.insertarrespuesta);
        this.router.get('/mispreguntas/:id', pregunta_Controller_1.preguntaController.getpreguntasusuario);
        this.router.post('/insertarexamen', pregunta_Controller_1.preguntaController.insertarexamen);
        this.router.get('/lastexamen', pregunta_Controller_1.preguntaController.getlastexamen);
        this.router.post('/preguntaexamen', pregunta_Controller_1.preguntaController.insertarexamenpregunta);
    }
}
const preguntaroutes = new PreguntaRoutes();
exports.default = preguntaroutes.router;
