import {Router} from 'express';
import {cienciaCrudController} from '../controllers/cienciacrud.Controller';



class CienciaCrudRoutes{
public router:Router=Router();
    constructor(){
        this.config();
    }
    config():void{
        this.router.post('/',cienciaCrudController.insertarciencia);
        this.router.get('/',cienciaCrudController.getfaciencias);
        this.router.get('/ciencia',cienciaCrudController.gettodasciencias);
    }
}

const cienciacrudroutes= new CienciaCrudRoutes();
export default cienciacrudroutes.router;