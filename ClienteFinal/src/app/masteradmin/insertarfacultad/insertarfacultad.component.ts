import { Component, OnInit } from '@angular/core';
import {facultad} from '../../models/facultad';
import {CrudfacultadService} from '../../services/crudfacultad.service';
@Component({
  selector: 'app-insertarfacultad',
  templateUrl: './insertarfacultad.component.html',
  styleUrls: ['./insertarfacultad.component.css']
})
export class InsertarfacultadComponent implements OnInit {
  facultad:facultad= {} as any;
  constructor(private crudfacultadservice:CrudfacultadService) { }

  ngOnInit() {
  }

  insertarfacultad(fac){
    if(fac.value){
    this.facultad.FACULTAD=fac.value;
    this.crudfacultadservice.crearfacultad(this.facultad).subscribe(
      res=>{
        alert('FACULTAD CREADA EXITOSAMENTE');
      },
      err=>{
        alert('ERROR: FACULTAD YA EXISTE');
      }
    );
    fac.value="";
  }
  }
}
