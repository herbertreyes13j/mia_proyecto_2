"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rolcrudController_1 = require("../controllers/rolcrudController");
class RolCrudRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', rolcrudController_1.rolCrudController.insertarusuario);
        this.router.get('/', rolcrudController_1.rolCrudController.getroles);
    }
}
const rolcrudroutes = new RolCrudRoutes();
exports.default = rolcrudroutes.router;
