import {Router} from 'express';
import {rolCrudController} from '../controllers/rolcrudController';

class RolCrudRoutes{
    public router:Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.post('/',rolCrudController.insertarusuario);
        this.router.get('/',rolCrudController.getroles);
    }
}

const rolcrudroutes = new RolCrudRoutes();
export default rolcrudroutes.router;