import { Component, OnInit } from '@angular/core';
import {SalaService} from '../../services/sala.service';
import { usuariosala} from '../../models/usuariosala';
import {RealizarexamenService} from '../../services/realizarexamen.service';
@Component({
  selector: 'app-buscarsala',
  templateUrl: './buscarsala.component.html',
  styleUrls: ['./buscarsala.component.css']
})
export class BuscarsalaComponent implements OnInit {

  constructor(private ss:SalaService, private res:RealizarexamenService) { }
  misala:any=[];
  usuariosala:usuariosala={} as any;
  ngOnInit() {
    if(localStorage.getItem('type')=='2'){
      window.location.href='/notaccess';
     }
     localStorage.removeItem('idsala');
     localStorage.removeItem('tiempo');
     localStorage.removeItem('idexamen');
  }

  buscarsala(nom){
    if(nom.value){
      this.ss.buscarsala(nom.value).subscribe(
        res=>{
          this.misala=res;
          if(this.misala.length ===0){
            alert('SALA NO ENCONTRADA');
          }else{
            console.log(res);
            localStorage.setItem('idsala',res[0][0]);
            localStorage.setItem('tiempo',res[0][2]);
            localStorage.setItem('idexamen',res[0][4]);
            this.usuariosala.ID_ESTUDIANTE=localStorage.getItem('id');
            this.usuariosala.ID_SALA=localStorage.getItem('idsala');
            this.usuariosala.NOTA=0;
            this.res.insertarsala(this.usuariosala).subscribe(
              res=>{
                window.location.href='/realizarexamen';
              },
              err=>{
                localStorage.removeItem('idsala');
                localStorage.removeItem('tiempo');
                localStorage.removeItem('idexamen');
                alert('NO PUEDE REALIZAR EXAMEN');
              }
            );
            

          }
          
          
        },err=>{
          alert('SALA NO ENCONTRADA');
        }
      );
    }
    nom.value="";
  }
}
