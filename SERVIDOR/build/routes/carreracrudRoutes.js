"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carreracrudController_1 = require("../controllers/carreracrudController");
class CarreraCrudRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', carreracrudController_1.carreraCrudController.insertarcarrera);
        this.router.get('/:id', carreracrudController_1.carreraCrudController.getcarreraid);
        this.router.get('/', carreracrudController_1.carreraCrudController.getcarreras);
    }
}
const carreracrudroutes = new CarreraCrudRoutes();
exports.default = carreracrudroutes.router;
