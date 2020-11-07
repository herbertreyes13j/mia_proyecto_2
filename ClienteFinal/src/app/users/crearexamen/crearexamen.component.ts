import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray,FormControl } from '@angular/forms';
import { CrudcienciaService } from '../../services/crudciencia.service';
import { CrudtemaService } from '../../services/crudtema.service';
import {PreguntasService} from '../../services/preguntas.service';
import {examen} from '../../models/examen';
import {examenpregunta} from '../../models/examenpregunta';

@Component({
  selector: 'app-crearexamen',
  templateUrl: './crearexamen.component.html',
  styleUrls: ['./crearexamen.component.scss']
})
export class CrearexamenComponent implements OnInit {
  form:FormGroup;
  ciencias:any=[];
  temas:any=[];
  preguntas:any=[];
  nuevoexamen:examen={} as any;
  nuevoexamenp:examenpregunta={} as any;
  constructor(private formBuilde:FormBuilder,private ccis:CrudcienciaService, private cts:CrudtemaService,
    private ps:PreguntasService) {
    this.form=this.formBuilde.group({
      preguntas:new FormArray([]),
    })
   }

  ngOnInit() {
    if(localStorage.getItem('type')!='2'){
      window.location.href='/notaccess';
     }
     
    this.ccis.getciencias2().subscribe(
      res=>{
        this.ciencias=res;
        console.log(this.ciencias);
      }
    );

    this.cts.gettemas().subscribe(
      res=>{
        this.temas=res;
      }
    );
      this.llenardatos();
  }

  async llenardatos(){
    await this.ps.getmispregutnas(localStorage.getItem('id')).subscribe(
      res=>{
        this.preguntas=res;
        console.log(res);
        this.addCheckboxes();
      },err=>{

      }
    );
  }

  private addCheckboxes(){
    this.preguntas.map((o,i)=>{
      const control = new FormControl(i===0);
      (this.form.controls.preguntas as FormArray).push(control);
    });

  }

  crearexamen(tit,des,tem,cie){
    console.log('Entra');
    if(tit.value && des.value && tem.value && cie.value){
      console.log('entra aca');
      this.nuevoexamen.TITULO=tit.value;
      this.nuevoexamen.ID_CIENCIA=cie.value;
      this.nuevoexamen.ID_TEMA=tem.value;
      this.nuevoexamen.ID_CATEDRATICO=localStorage.getItem('id');

      this.ps.insertarexamen(this.nuevoexamen).subscribe(
        res=>{
          this.ps.getlastexamen().subscribe(
            res=>{
              this.nuevoexamenp.ID_EXAMEN=res[0][0];
              let selectedPreguntasIds = this.form.value.preguntas
              .map((v, i) => v ? this.preguntas[i].ID_PREGUNTA : null)
              .filter(v => v !== null);
            console.log(selectedPreguntasIds);
        
            for(let uno of selectedPreguntasIds){
              this.nuevoexamenp.ID_PREGUNTA=uno;
              this.ps.insertarexamenpregunta(this.nuevoexamenp).subscribe(
                res=>{

                },err=>{
                  alert('No se pudo agregar pregunta al examen');
                }
              );
            }
            tit.value="";
            des.value="";
            tem.value="";
            cie.value="";
            alert('Examen creado exitosamente');
            },err=>{

            }
          );
        },err=>{
          alert("ERROR: NO SE PUDO CREAR EXAMEN");
        }
      );


    }
  }

}
