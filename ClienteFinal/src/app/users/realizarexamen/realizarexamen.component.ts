import { Component, OnInit, Pipe, PipeTransform, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray,FormControl } from '@angular/forms';
import {RealizarexamenService} from '../../services/realizarexamen.service';
import {usuariosala} from '../../models/usuariosala';
@Component({
  selector: 'app-realizarexamen',
  templateUrl: './realizarexamen.component.html',
  styleUrls: ['./realizarexamen.component.scss'],

})
@Pipe(
  {
    name:'prueba',
  }
)

export class RealizarexamenComponent implements OnInit{
  getname:String;
  timeLeft: number = Number(localStorage.getItem('tiempo'))*60;
  interval;
  resm:any=[];
  preguntas:any=[];
  todasrespuestas:any=[];
  tempora:any=[];
  segundos:number=0;
  minutos:number=0;
  nota:number=0;
  notafina:number=0;
  usersala:usuariosala={} as any;

  constructor(private formBuilde:FormBuilder, private rrs:RealizarexamenService) { 
    this.form=this.formBuilde.group({
      resm:new FormArray([])
    })
  }
  form:FormGroup;
  ngOnInit() {

    if(localStorage.getItem('idsala')===null){
      window.location.href='/start/buscarsala';
     }else{
    this.startTimer();
    this.rrs.getpreguntas(localStorage.getItem('idexamen')).subscribe(
      res=>{

        this.preguntas=res;
        console.log(this.preguntas);

        for(let pregutna of this.preguntas){

        
            this.rrs.getrespuestas(pregutna.ID_PREGUNTA).subscribe(
              res=>{
               
                this.tempora=res;
                for(let temp of this.tempora){
        
                  this.todasrespuestas.push(temp);
                  console.log(this.todasrespuestas[0]);
                }
                
                this.tempora=[];
              
              
              }
              );
          

   
       
        }
    
      }
    );
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {

        this.timeLeft--;
        this.minutos=Math.round(this.timeLeft/60-.5);
        this.segundos=this.timeLeft%60;
      } else {
        this.notafina=(this.nota/this.preguntas.length)*100;
        this.notafina=(this.nota/this.preguntas.length)*100;
        this.usersala.ID_ESTUDIANTE=localStorage.getItem('id');
        this.usersala.ID_SALA=localStorage.getItem('idsala');
        this.usersala.NOTA=this.notafina;
        this.rrs.actualizarnota(this.usersala).subscribe(
          res=>{

          }
        );
        localStorage.removeItem('idsala');
        localStorage.removeItem('tiempo');
        localStorage.removeItem('idexamen');
        alert(`Nota Final: ${this.notafina}`);
        clearInterval(this.interval);
        window.location.href='/start/buscarsala';
      }
    },1000)
  }


  


  RespuestaVF(ID_PREGUNTA:any,pvfvalor,btn3){
    pvfvalor.disabled=true;
    btn3.disabled=true;
    for(let respuesta of this.todasrespuestas){
      if(respuesta.ID_PREGUNTA===ID_PREGUNTA){
        if(pvfvalor.value===respuesta.VALOR){
            this.nota++;
        }else{

        }
      }
    }
  }

  RespuestaTxt(ID_PREGUNTA:any,txtr,btn1){
    btn1.disabled=true;
    for(let respuesta of this.todasrespuestas){
      txtr.disabled=true;
      if(respuesta.ID_PREGUNTA===ID_PREGUNTA){
        if(txtr.value===respuesta.VALOR){
          this.nota++;
        }else{
        
        }
      }
    }
  
  }
  ResponderM(mulr,btn2){
    mulr.disabled=true;
    btn2.disabled=true;
    if(mulr.value==='1'){
      this.nota++;
    }else{
   
    }
  }

  terminarexamen(){
    this.notafina=(this.nota/this.preguntas.length)*100;
    this.usersala.ID_ESTUDIANTE=localStorage.getItem('id');
    this.usersala.ID_SALA=localStorage.getItem('idsala');
    this.usersala.NOTA=this.notafina;
    this.rrs.actualizarnota(this.usersala).subscribe(
      res=>{
        
      }
    );
    localStorage.removeItem('idsala');
    localStorage.removeItem('tiempo');
    localStorage.removeItem('idexamen');
    alert(`Nota Final: ${this.notafina}`);

    window.location.href='/start/buscarsala';

  }
}
