"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indextController_1 = require("../controllers/indextController");
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', indextController_1.indextController.index);
    }
}
const inicioRoutes = new IndexRoutes();
exports.default = inicioRoutes.router;
