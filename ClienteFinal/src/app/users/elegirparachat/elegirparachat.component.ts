import { Component, OnInit } from '@angular/core';
import {CrudusuarioService} from '../../services/crudusuario.service';

@Component({
  selector: 'app-elegirparachat',
  templateUrl: './elegirparachat.component.html',
  styleUrls: ['./elegirparachat.component.scss']
})
export class ElegirparachatComponent implements OnInit {
  usuarios:any=[];
  constructor(private cus:CrudusuarioService) { }

  ngOnInit() {
    localStorage.removeItem('id_user2');
    this.cus.getusuariodiferente(localStorage.getItem('id')).subscribe(
      res=>{
        this.usuarios=res;
        console.log(this.usuarios);
      },
      err=>{

      }
    );
  }

  iniciarchat(user2:string){
    localStorage.setItem('id_user2',user2);
    window.location.href='/start/chat';
    console.log(user2);

  }

}
