import { Component, OnInit } from '@angular/core';
import {rol} from '../../models/rol';
import {AlertService} from 'ngx-alerts';
import {CrearrolserviceService} from '../../services/crearrolservice.service';
@Component({
  selector: 'app-insertarrol',
  templateUrl: './insertarrol.component.html',
  styleUrls: ['./insertarrol.component.css']
})
export class InsertarrolComponent implements OnInit {
  elrol:rol={} as any;
  constructor(private crearrolservice:CrearrolserviceService, private alertservice:AlertService) { }

  ngOnInit() {
  }

  insertarrol(rol){
  
    if(rol.value){
    this.elrol.ROL=rol.value;
    console.log(this.elrol);
    this.crearrolservice.crearrol(this.elrol).subscribe(
      res=> {
          alert('ROL CREADO EXITOSAMENTE')
        },
      err=> {
       alert('ERROR: ROL YA EXISTE');
      }

    );
    rol.value="";
  }
}
}
