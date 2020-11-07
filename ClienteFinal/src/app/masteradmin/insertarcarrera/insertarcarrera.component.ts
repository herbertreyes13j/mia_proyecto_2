import { Component, OnInit } from '@angular/core';
import {CrudfacultadService} from '../../services/crudfacultad.service';
import {carrera} from '../../models/carrera';
import {CrudcarreraService} from '../../services/crudcarrera.service';
@Component({
  selector: 'app-insertarcarrera',
  templateUrl: './insertarcarrera.component.html',
  styleUrls: ['./insertarcarrera.component.css']
})

export class InsertarcarreraComponent implements OnInit {
  facultades:any=[];
  carrera:carrera={} as any;
  constructor(private cfs:CrudfacultadService, private ccs:CrudcarreraService) { }

  ngOnInit() {
    this.cfs.getfacultades().subscribe(
      res=>{
        this.facultades=res;
      },
      err => console.log(err)
    );
  }

  insertarcarrera(fac,carr){
    if(carr.value && fac.value){
      this.carrera.ID_FACULTAD=fac.value;
      this.carrera.NOMBRE=carr.value;
      this.ccs.crearcarrera(this.carrera).subscribe(
        res=>{
          alert('CARRERA CREADA EXITOSAMENTE');
        },
        err=>{
          alert('ERROR: CARRERA YA EXISTE');
        }
      );
    }

    carr.value="";
    fac.value="";
  }
}
