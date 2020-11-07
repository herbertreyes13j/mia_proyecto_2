import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray,FormControl } from '@angular/forms';
import {CrudcarreraService} from '../../services/crudcarrera.service';
import {CrudfacultadService} from '../../services/crudfacultad.service';
import {CrudcienciaService} from '../../services/crudciencia.service';
import {CrudtemaService} from '../../services/crudtema.service';
import {temacarrera} from '../../models/temacarrera';
import {temaciencia} from '../../models/temaciencia';
import {temafacultad} from '../../models/temafacultad';
import {tema} from '../../models/tema';

@Component({
  selector: 'app-creartema',
  templateUrl: './creartema.component.html',
  styleUrls: ['./creartema.component.scss']
})
export class CreartemaComponent implements OnInit {
  form:FormGroup;
  facultades:any=[];
  carreras:any=[];
  ciencias:any=[];
  tema:tema={} as any;
  temacarrera:temacarrera={} as any;
  temaciencia:temaciencia={} as any;
  temafacultad:temafacultad={} as any;


  constructor(private formBuilde:FormBuilder, private ccs:CrudcarreraService, private cfs:CrudfacultadService,
    private ccis:CrudcienciaService, private cts:CrudtemaService) { 

      this.form=this.formBuilde.group({
        facultades:new FormArray([]),
        carreras:new FormArray([]),
        ciencias:new FormArray([])
      })
    }

  ngOnInit() {
    this.llenardatos();
  }

  private addCheckboxes(){
    this.facultades.map((o,i)=>{
      const control = new FormControl(i===0);
      (this.form.controls.facultades as FormArray).push(control);
    });
    this.carreras.map((o,i)=>{
      const control = new FormControl(i===0);
      (this.form.controls.carreras as FormArray).push(control);
    });
    this.ciencias.map((o,i)=>{
      const control = new FormControl(i===0);
      (this.form.controls.ciencias as FormArray).push(control);
    });
  }
  async llenardatos(){
    await this.ccis.getciencias2().subscribe(
      res=>{
        this.ciencias=res; 
        console.log(res);
      }
    );

    await this.ccs.getcarreras().subscribe(
      res=>{
       
        this.carreras=res;
      }
    );

    await this.cfs.getfacultades().subscribe(
      res=>{
        this.facultades=res;
        console.log(this.facultades);
        console.log(this.carreras);
        console.log(this.ciencias);
        this.addCheckboxes();

      }
    )
  }

  submit(tit,des){
    if(tit.value && des.value){
        this.tema.DESCRIPCION=des.value;
        this.tema.ID_USUARIO=localStorage.getItem('id');
        this.tema.TITULO=tit.value;

        this.cts.insertartema(this.tema).subscribe(
          res=>{
            alert('TEMA CREADO EXITOSAMENTE');
            this.cts.getidtema(localStorage.getItem('id'),this.tema.TITULO).subscribe(
              res=>{
                  this.temacarrera.ID_TEMA=res[0][0];
                  this.temaciencia.ID_TEMA=res[0][0];
                  this.temafacultad.ID_TEMA=res[0][0];

                  let selectedCarrerasIds = this.form.value.carreras
                  .map((v, i) => v ? this.carreras[i].ID_CARRERA : null)
                  .filter(v => v !== null);
                console.log(selectedCarrerasIds);
            
                for(let uno of selectedCarrerasIds){
                  this.temacarrera.ID_CARRERA=uno;
                  this.cts.insertartemacarrera(this.temacarrera).subscribe(
                    res=>{
                    },
                    err=>{
                    }
                  );
                }

                let selectedFacultadesIds = this.form.value.facultades
                .map((v, i) => v ? this.facultades[i].ID_FACULTAD : null)
                .filter(v => v !== null);
              console.log(selectedFacultadesIds);
          
              for(let uno of selectedFacultadesIds){
                this.temafacultad.ID_FACULTAD=uno;
                this.cts.insertartemafacultad(this.temafacultad).subscribe(
                  res=>{
                  },
                  err=>{
                  }
                );
              }

              let selectedCienciasIds = this.form.value.ciencias
              .map((v, i) => v ? this.ciencias[i].ID_CIENCIA : null)
              .filter(v => v !== null);
              
            console.log(selectedCienciasIds);
        
            for(let uno of selectedCienciasIds){
              this.temaciencia.ID_CIENCIA=uno;
              this.cts.insertartemaciencia(this.temaciencia).subscribe(
                res=>{
                },
                err=>{
                }
              );
            }
              },
              err=>{

              }
            );
          },err=>{
            alert('ERROR CON CREAR TEMA');
          }

        )
    }
    tit.value="";
    des.value="";
  }

}
