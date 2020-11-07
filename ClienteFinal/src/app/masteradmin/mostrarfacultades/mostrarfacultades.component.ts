import { Component, OnInit } from '@angular/core';
import {CrudfacultadService} from '../../services/crudfacultad.service';
@Component({
  selector: 'app-mostrarfacultades',
  templateUrl: './mostrarfacultades.component.html',
  styleUrls: ['./mostrarfacultades.component.css']
})
export class MostrarfacultadesComponent implements OnInit {
  facultades:any=[];
  constructor(private cfs:CrudfacultadService) { }

  ngOnInit() {
    this.cfs.getfacultades().subscribe(
      res=>{
        this.facultades=res;
      },
      err => console.log(err)
    );
  }

}
