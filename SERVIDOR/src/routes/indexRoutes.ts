import {Router} from 'express';
import {indextController} from '../controllers/indextController';

class IndexRoutes{
    public router:Router= Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',indextController.index);
    }
}

const inicioRoutes= new IndexRoutes();
export default inicioRoutes.router;