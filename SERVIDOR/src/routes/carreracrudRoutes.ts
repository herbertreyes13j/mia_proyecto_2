import {Router} from 'express';
import {carreraCrudController} from '../controllers/carreracrudController';

class CarreraCrudRoutes{
public router:Router=Router();
    constructor(){
        this.config();
    }
    config():void{
        this.router.post('/',carreraCrudController.insertarcarrera);
        this.router.get('/:id',carreraCrudController.getcarreraid)
        this.router.get('/',carreraCrudController.getcarreras);
    }
}

const carreracrudroutes= new CarreraCrudRoutes();
export default carreracrudroutes.router;