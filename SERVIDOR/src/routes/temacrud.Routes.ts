import {Router} from 'express';
import {temaCrudController} from '../controllers/temacrud.Controller';


class TemaCrudRoutes{
public router:Router=Router();
    constructor(){
        this.config();
    }
    config():void{
        this.router.get('/',temaCrudController.gettemas);
        this.router.post('/',temaCrudController.insertartema);
        this.router.get('/gettemaid/:id/:titulo',temaCrudController.gettemaid);
        this.router.post('/facultad',temaCrudController.insertartemafacultad);
        this.router.post('/carrera',temaCrudController.insertartemacarrera);
        this.router.post('/ciencia',temaCrudController.insertartemaciencia);
        this.router.get('/get1tema/:id',temaCrudController.get1temaid);
        this.router.get('/respuesta/:idtema',temaCrudController.getrespuestas);
        this.router.post('/insertarrespuesta',temaCrudController.insertarrespuesta);
        this.router.put('/:id',temaCrudController.updatetema);
 
    }
}

const temacrudroutes= new TemaCrudRoutes();
export default temacrudroutes.router;