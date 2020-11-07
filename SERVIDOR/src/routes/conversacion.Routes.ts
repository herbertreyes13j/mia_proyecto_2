import {Router} from 'express';
import {conversacionController} from '../controllers/conversacionController';

class ConversacionRoutes{
public router:Router=Router();
    constructor(){
        this.config();
    }
    config():void{
        this.router.get('/:id1/:id2',conversacionController.getidconversacion);
        this.router.post('/',conversacionController.insertarconversacion);
        this.router.get('/:id',conversacionController.getmensajes);
    }
}

const conversacionroutes= new ConversacionRoutes();
export default conversacionroutes.router;