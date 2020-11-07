import { Component, OnInit } from '@angular/core';
import {CrudcienciaService} from '../../services/crudciencia.service';
import {EstadisticasService} from '../../services/estadisticas.service';
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  ciencias:any=[];
  usuarios1:any=[];
  usuarios2:any=[];
  usuarios3:any=[];
  usuarios4:any=[];
  usuarios5:any=[];
  constructor(private ccs:CrudcienciaService, private es:EstadisticasService ) { }

  ngOnInit() {
    this.ccs.getciencias2().subscribe(
      res=>{
        this.ciencias=res;
      }
    );
  }

  VerEst1(cien){
    if(cien.value){
      this.es.getestadistica1(cien.value).subscribe(
        res=>{
          this.usuarios1=res;
        }
      );
    }
  }

  VerEst2(cien){
    if(cien.value){
      this.es.getestadistica2(cien.value).subscribe(
        res=>{
          this.usuarios2=res;
        }
      );
    }
  }

  VerEst3(){
      this.es.getestadistica3().subscribe(
        res=>{
          this.usuarios3=res;
        }
      );
    
  }
  VerEst4(cien){
    if(cien.value){
      if(cien.value=="0"){
        this.es.getestadistica4g().subscribe(
          res=>{
            this.usuarios4=res;
          }
        );
      }else{
        this.es.getestadistica4(cien.value).subscribe(
          res=>{
            this.usuarios4=res;
          }
        );
      }
     
    }
  }
  VerEst5(cien){
    if(cien.value){
      if(cien.value=="0"){
        this.es.getestadistica5g().subscribe(
          res=>{
            this.usuarios5=res;
          }
        );
      }else{
        this.es.getestadistica5(cien.value).subscribe(
          res=>{
            this.usuarios5=res;
          }
        );
      }
     
    }
  }

}
