"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const temacrud_Controller_1 = require("../controllers/temacrud.Controller");
class TemaCrudRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', temacrud_Controller_1.temaCrudController.gettemas);
        this.router.post('/', temacrud_Controller_1.temaCrudController.insertartema);
        this.router.get('/gettemaid/:id/:titulo', temacrud_Controller_1.temaCrudController.gettemaid);
        this.router.post('/facultad', temacrud_Controller_1.temaCrudController.insertartemafacultad);
        this.router.post('/carrera', temacrud_Controller_1.temaCrudController.insertartemacarrera);
        this.router.post('/ciencia', temacrud_Controller_1.temaCrudController.insertartemaciencia);
        this.router.get('/get1tema/:id', temacrud_Controller_1.temaCrudController.get1temaid);
        this.router.get('/respuesta/:idtema', temacrud_Controller_1.temaCrudController.getrespuestas);
        this.router.post('/insertarrespuesta', temacrud_Controller_1.temaCrudController.insertarrespuesta);
        this.router.put('/:id', temacrud_Controller_1.temaCrudController.updatetema);
    }
}
const temacrudroutes = new TemaCrudRoutes();
exports.default = temacrudroutes.router;
