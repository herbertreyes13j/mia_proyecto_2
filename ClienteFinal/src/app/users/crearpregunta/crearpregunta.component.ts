import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray,FormControl } from '@angular/forms';
import {pregunta} from '../../models/pregunta';
import {PreguntasService} from '../../services/preguntas.service';
import {respuestaexamen} from '../../models/respeustaexamen';

@Component({
  selector: 'app-crearpregunta',
  templateUrl: './crearpregunta.component.html',
  styleUrls: ['./crearpregunta.component.scss']
})
export class CrearpreguntaComponent implements OnInit {
  form:FormGroup;
  resm:any=[];
  pregunta:pregunta={} as any;
  respeustaexamen:respuestaexamen={} as any;
  constructor(private formBuilde:FormBuilder,private ps:PreguntasService) {
    this.form=this.formBuilde.group({
      resm:new FormArray([])
    })
   }

  ngOnInit() {
    if(localStorage.getItem('type')!='2'){
      window.location.href='/notaccess';
     }
  }

  private addChekboxes(){
    this.resm.map((o,i)=>{
      const control = new FormControl(i===0);
      (this.form.controls.resm as FormArray).push(control);
    });
  }

  agregarrepuesta(nr){
    if(nr.value){
      this.form=this.formBuilde.group({
        resm:new FormArray([])
      });
    this.resm.push(nr.value);
    console.log(this.resm);
    this.resm.map((o,i)=>{
      
      const control = new FormControl(i===0);
      (this.form.controls.resm as FormArray).push(control);
    });
  }
    nr.value="";
  }

  CrearPTexto(ptexto,restexto){
    if(ptexto.value && restexto.value){
      this.pregunta.ID_USUARIO=localStorage.getItem('id');
      this.pregunta.PREGUNTA=ptexto.value;
      this.pregunta.TIPOPREGUNTA="1";
      this.ps.insertarpregunta(this.pregunta).subscribe(
        res=>{
          this.ps.getlastpregunta().subscribe(
            res=>{
                this.respeustaexamen.ID_PREGUNTA=res[0][0];
                this.respeustaexamen.CORRECTA='1';
                this.respeustaexamen.VALOR=restexto.value;
                console.log(this.respeustaexamen);
                this.ps.insertarrespuesta(this.respeustaexamen).subscribe(
                  res=>{
                    alert('PREGUNTA AGREGADA EXITOSAMENTE');
                    ptexto.value="";
                    restexto.value="";
                  },err=>{

                  }
                );

            },err=>{

            }
          );

        },err=>{
          alert('ERROR: PREGUNTA NO PUSO SER CREADA');
        }
      );
    }

  }

  CrearPVF(pvf,pvfvalor){

    if(pvf.value){
      this.pregunta.ID_USUARIO=localStorage.getItem('id');
      this.pregunta.PREGUNTA=pvf.value;
      this.pregunta.TIPOPREGUNTA="3";
      this.ps.insertarpregunta(this.pregunta).subscribe(
        res=>{
          this.ps.getlastpregunta().subscribe(
            res=>{
                this.respeustaexamen.ID_PREGUNTA=res[0][0];
                this.respeustaexamen.CORRECTA='1';
                this.respeustaexamen.VALOR=pvfvalor.value;
                console.log(this.respeustaexamen);
                this.ps.insertarrespuesta(this.respeustaexamen).subscribe(
                  res=>{
                    alert('PREGUNTA AGREGADA EXITOSAMENTE');
                    pvf.value="";
                  
                  },err=>{

                  }
                );

            },err=>{

            }
          );

        },err=>{
          alert('ERROR: PREGUNTA NO PUSO SER CREADA');
        }
      );
    }
  }

  CrearPMultiple(pmultiple){

    if(pmultiple.value){
      this.pregunta.ID_USUARIO=localStorage.getItem('id');
      this.pregunta.PREGUNTA=pmultiple.value;
      this.pregunta.TIPOPREGUNTA="2";
      this.ps.insertarpregunta(this.pregunta).subscribe(
        res=>{
          this.ps.getlastpregunta().subscribe(
            res=>{

            this.respeustaexamen.ID_PREGUNTA=res[0][0];
            let selectedRespuestasIds = this.form.value.resm
            .map((v, i) => v ? this.resm[i]: null)
              .filter(v => v !== null);

            for(let respuesta of this.resm){
              this.respeustaexamen.VALOR=respuesta;
              if(selectedRespuestasIds.find(x=> x===respuesta)){
                this.respeustaexamen.CORRECTA='1';
            }else{
              this.respeustaexamen.CORRECTA='0';
            }
                          
            this.ps.insertarrespuesta(this.respeustaexamen).subscribe(
              res=>{
               
              },err=>{
              }
            );
          }
          this.resm=[];
          this.form=this.formBuilde.group({
            resm:new FormArray([])
          })
          pmultiple.value="";
          alert('Pregunta Creada Exitosamente');
            },err=>{

            }
          );

        },err=>{
          alert('ERROR: PREGUNTA NO PUSO SER CREADA');
        }
      );
    }


   
    
 
    

  }
}
