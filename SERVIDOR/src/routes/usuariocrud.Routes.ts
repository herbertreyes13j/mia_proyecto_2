import {Router} from 'express';
import {usuarioCrudController} from '../controllers/usuariocrudController';


class UsuarioCrudRoutes{
public router:Router=Router();
    constructor(){
        this.config();
    }
    config():void{

        this.router.post('/',usuarioCrudController.insertarusuario);
        this.router.post('/carrera/',usuarioCrudController.insertarusuariocarrera);
        this.router.post('/rol/',usuarioCrudController.insertarusuariorol);
        this.router.get('/:correo',usuarioCrudController.getusuarioid);
        this.router.get('/diferente/:id',usuarioCrudController.getusuariodiferente);
    }
}

const usuariocrudroutes= new UsuarioCrudRoutes();
export default usuariocrudroutes.router;