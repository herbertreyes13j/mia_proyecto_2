"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sala_Controller_1 = require("../controllers/sala.Controller");
class SalaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/misexamenes/:id', sala_Controller_1.salaController.getmisexamenes);
        this.router.post('/nuevasala', sala_Controller_1.salaController.insertarsala);
        this.router.get('/buscarsala/:sala', sala_Controller_1.salaController.buscarsala);
    }
}
const salaroutes = new SalaRoutes();
exports.default = salaroutes.router;
