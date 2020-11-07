"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conversacionController_1 = require("../controllers/conversacionController");
class ConversacionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id1/:id2', conversacionController_1.conversacionController.getidconversacion);
        this.router.post('/', conversacionController_1.conversacionController.insertarconversacion);
        this.router.get('/:id', conversacionController_1.conversacionController.getmensajes);
    }
}
const conversacionroutes = new ConversacionRoutes();
exports.default = conversacionroutes.router;
