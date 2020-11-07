"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const facultadcrudController_1 = require("../controllers/facultadcrudController");
class FacultadCrudRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', facultadcrudController_1.facultadCrudController.insertarfacultad);
        this.router.get('/', facultadcrudController_1.facultadCrudController.getfacultades);
    }
}
const facultadcrudroutes = new FacultadCrudRoutes();
exports.default = facultadcrudroutes.router;
