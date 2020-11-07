import {Router} from 'express';
import {preguntaController} from '../controllers/pregunta.Controller';

class PreguntaRoutes{
public router:Router=Router();

constructor(){
    this.config();
}

config():void{
    this.router.post('/',preguntaController.insertarpregunta);
    this.router.get('/last',preguntaController.getlastinsertada);
    this.router.post('/respuesta',preguntaController.insertarrespuesta);
    this.router.get('/mispreguntas/:id',preguntaController.getpreguntasusuario);
    this.router.post('/insertarexamen',preguntaController.insertarexamen);
    this.router.get('/lastexamen',preguntaController.getlastexamen);
    this.router.post('/preguntaexamen',preguntaController.insertarexamenpregunta);
}
}
const preguntaroutes = new PreguntaRoutes();
export default preguntaroutes.router;