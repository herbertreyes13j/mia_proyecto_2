import {Router} from 'express';
import {realizarexamenController} from '../controllers/realizarexamen.Controller';

class RealizarExamenRoutes{
    public router:Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/preguntas/:idexamen',realizarexamenController.getpreguntas);
        this.router.get('/respuestas/:idpregunta',realizarexamenController.getrespuestas);
        this.router.post('/salausuario',realizarexamenController.insertarestudiantesala);
        this.router.post('/actualizarnota',realizarexamenController.actualizarnota);
        this.router.get('/getmisala/:idusuario',realizarexamenController.getsalas);
        this.router.get('/notas/:sala',realizarexamenController.getnotas);
    }
}

const realizarexamenroutes = new RealizarExamenRoutes();
export default realizarexamenroutes.router;