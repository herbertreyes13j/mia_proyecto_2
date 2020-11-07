import {Router} from 'express';
import {facultadCrudController} from '../controllers/facultadcrudController';

class FacultadCrudRoutes{
public router:Router=Router();

constructor(){
    this.config();
}

config():void{
    this.router.post('/',facultadCrudController.insertarfacultad);
    this.router.get('/',facultadCrudController.getfacultades);
}
}
const facultadcrudroutes = new FacultadCrudRoutes();
export default facultadcrudroutes.router;