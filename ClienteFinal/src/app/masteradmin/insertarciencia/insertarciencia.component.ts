import { Component, OnInit } from '@angular/core';
import {CrudfacultadService} from '../../services/crudfacultad.service';
import {CrudcarreraService} from '../../services/crudcarrera.service';
import {CrudcienciaService} from '../../services/crudciencia.service';
import {ciencia} from '../../models/ciencia';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-insertarciencia',
  templateUrl: './insertarciencia.component.html',
  styleUrls: ['./insertarciencia.component.css']
})
export class InsertarcienciaComponent implements OnInit {
  facultades:any=[];
  carreras:any=[];
  ciencia:ciencia={} as any;
  constructor(private cfs:CrudfacultadService, private ccs:CrudcarreraService,private ccis:CrudcienciaService) { }

  ngOnInit() {
    this.cfs.getfacultades().subscribe(
      res=>{
        this.facultades=res;
      },
      err => console.log(err)
    );
  }

  onChange(newValue) {
    console.log(newValue);
    
    this.ccs.getcarrera(newValue).subscribe(
      res=>{
        this.carreras=res;
      },
      err => console.log(err)
    );
    // ... do other stuff here ...
}

crearciencia(facu,carre,cien, descr){

  if(carre.value && cien.value && descr.value){
    this.ciencia.CIENCIA=cien.value;
    this.ciencia.DESCRIPCION=descr.value;
    this.ciencia.ID_CARRERA=carre.value;

    this.ccis.crearciencia(this.ciencia).subscribe(
      res=>{
        alert('CIENCIA CREADA EXITOSAMENTE');
      },
      err=>{
        alert('ERROR: NO SE PUDO CREAR CIENCIA');
      }
    )
      carre.value="";
      cien.value="";
      descr.value="";
      facu.value="";
  }
}

}
