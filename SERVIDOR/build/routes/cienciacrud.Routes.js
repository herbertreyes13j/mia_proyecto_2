"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cienciacrud_Controller_1 = require("../controllers/cienciacrud.Controller");
class CienciaCrudRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', cienciacrud_Controller_1.cienciaCrudController.insertarciencia);
        this.router.get('/', cienciacrud_Controller_1.cienciaCrudController.getfaciencias);
        this.router.get('/ciencia', cienciacrud_Controller_1.cienciaCrudController.gettodasciencias);
    }
}
const cienciacrudroutes = new CienciaCrudRoutes();
exports.default = cienciacrudroutes.router;
