import { Component, OnInit } from '@angular/core';
import {CrudtemaService} from '../../services/crudtema.service';
import {respuesta} from '../../models/respuesta';

@Component({
  selector: 'app-comentartema',
  templateUrl: './comentartema.component.html',
  styleUrls: ['./comentartema.component.scss']
})
export class ComentartemaComponent implements OnInit {


  Titulo:String;
  Descripcion:String;
  Respuestas:any=[];
  respuesta:respuesta={} as any;
  constructor(private cts:CrudtemaService) { 

  }

ngOnInit() {

    console.log(localStorage.getItem('idtemaactual'));
    this.cts.get1tema(localStorage.getItem('idtemaactual')).subscribe(
      res=>{
        console.log(res);
        this.Titulo=res[0][1];
        this.Descripcion=res[0][2];
      },
      err=>{

      }
    );

     this.cts.getrespuesta(localStorage.getItem('idtemaactual')).subscribe(
      res=>{
        
        this.Respuestas=res;
        console.log(this.Respuestas);
      },
      err=>{

      }
    );
  
  }

  Comentar(des2){
    if(des2.value){
      console.log(des2.value);
      this.respuesta.RESPUESTA=des2.value;
      this.respuesta.ID_TEMA=localStorage.getItem('idtemaactual');
      this.respuesta.ID_USUARIO=localStorage.getItem('id');
      this.cts.insertarrespuesta(this.respuesta).subscribe(
        res=>{
          this.cts.updatetema(localStorage.getItem('idtemaactual')).subscribe(
            res=>{

            },err=>{
              
            }

          );
          this.cts.getrespuesta(localStorage.getItem('idtemaactual')).subscribe(
            res=>{
              
              this.Respuestas=res;
              console.log(this.Respuestas);
            },
            err=>{
      
            }
          );
        },err=>{

        }
      );
    }
    des2.value="";
  }

}
