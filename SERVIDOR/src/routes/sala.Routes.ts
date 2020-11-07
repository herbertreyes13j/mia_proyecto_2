import {Router} from 'express';
import {salaController} from '../controllers/sala.Controller';

class SalaRoutes{
    public router:Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/misexamenes/:id',salaController.getmisexamenes);
        this.router.post('/nuevasala',salaController.insertarsala);
        this.router.get('/buscarsala/:sala',salaController.buscarsala);
    
    }
}

const salaroutes = new SalaRoutes();
export default salaroutes.router;