import { Component, OnInit } from '@angular/core';
import { CrudtemaService} from '../../services/crudtema.service';
@Component({
  selector: 'app-vertemas',
  templateUrl: './vertemas.component.html',
  styleUrls: ['./vertemas.component.scss']
})
export class VertemasComponent implements OnInit {
  temas:any=[];
  constructor(private cts:CrudtemaService) { }

  ngOnInit() {
    this.cts.gettemas().subscribe(
      res=>{
        this.temas=res;
        console.log(res);
      },
      err => console.log(err)
    );
  }

  iralapagina(id_tema:Number,id_usuario){
    console.log(id_tema,id_usuario);
    localStorage.setItem('idtemaactual',String(id_tema));
    window.location.href='/start/comentartema';
  }

}
