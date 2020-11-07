import { Component, OnInit } from '@angular/core';
import {CrudcienciaService} from '../../services/crudciencia.service';
@Component({
  selector: 'app-mostrarciencia',
  templateUrl: './mostrarciencia.component.html',
  styleUrls: ['./mostrarciencia.component.css']
})
export class MostrarcienciaComponent implements OnInit {

  ciencias:any=[];
  constructor(private ccs:CrudcienciaService) { }

  ngOnInit() {
    this.ccs.getciencias().subscribe(
      res=>{
        this.ciencias=res;
      },
      err => console.log(err)
    );
  }
}
