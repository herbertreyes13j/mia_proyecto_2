import { Component, OnInit } from '@angular/core';
import {RealizarexamenService} from '../../services/realizarexamen.service';
@Component({
  selector: 'app-vernotas',
  templateUrl: './vernotas.component.html',
  styleUrls: ['./vernotas.component.css']
})
export class VernotasComponent implements OnInit {
  rooms:any=[];
  notas:any=[];
  constructor(private res:RealizarexamenService) { }

  ngOnInit() {
    if(localStorage.getItem('type')!='2'){
      window.location.href='/notaccess';
     }
    this.res.getmisalas(localStorage.getItem('id')).subscribe(
      res=>{
        this.rooms=res;
      }
    );
  }

  obtenernotas(sal){
    if(sal.value){
      this.res.getnotas(sal.value).subscribe(
        res=>{
          this.notas=res;
        }
      )
    }
  }

}
