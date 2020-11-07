import { Component, OnInit } from '@angular/core';
import {SalaService} from '../../services/sala.service';
import { sala } from 'src/app/models/sala';
@Component({
  selector: 'app-crearsala',
  templateUrl: './crearsala.component.html',
  styleUrls: ['./crearsala.component.css']
})
export class CrearsalaComponent implements OnInit {

  constructor(private ss:SalaService) { }
  examenes:any=[];
  nuevasala:sala={} as any;
  ngOnInit() {
    if(localStorage.getItem('type')!='2'){
      window.location.href='/notaccess';
     }
   this.ss.getmisexamenes(localStorage.getItem('id')).subscribe(
     res=>{
       console.log(res);
       this.examenes=res;
     }
   );
  }

  crearsala(nom,tim,exa){
    if(nom.value && tim.value && exa.value){
      this.nuevasala.ESTADO='1';
      this.nuevasala.ID_EXAMEN=exa.value;
      this.nuevasala.NOMBRE=nom.value;
      this.nuevasala.TIEMPO=tim.value;
      this.ss.insertarsala(this.nuevasala).subscribe(
        res=>{
          alert('SALA CREADA EXITOSAMENTE');
        },err=>{
          alert('SALA NO SE PUDO CREAR');
        }
      );
    }
  }


}
