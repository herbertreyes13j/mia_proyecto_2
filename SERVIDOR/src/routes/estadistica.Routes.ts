import {Router} from 'express';
import {estadisticaController} from '../controllers/estadisticas.Controller';


class EstadisticaRoutes{
    public router:Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/estadistica1/:ciencia',estadisticaController.getestadistica1);
        this.router.get('/estadistica2/:ciencia',estadisticaController.getestadistica2);
        this.router.get('/estadistica3',estadisticaController.getestadistica3);
        this.router.get('/estadistica4general',estadisticaController.getestadistica4general);
        this.router.get('/estadistica4/:ciencia',estadisticaController.getestadistica4);
        this.router.get('/estadistica5general',estadisticaController.getestadistica5general);
        this.router.get('/estadistica5/:ciencia',estadisticaController.getestadistica5);
    }
}

const estadisticaroutes = new EstadisticaRoutes();
export default estadisticaroutes.router;