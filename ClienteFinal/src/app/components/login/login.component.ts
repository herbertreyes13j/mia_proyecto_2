import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {sesion} from '../../models/sesion';
import {AlertService} from 'ngx-alerts';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  roles:any=[];
  sesion:sesion= {} as any;
  constructor(private loginService:LoginService, private alertService:AlertService) {
  
   }

  ngOnInit() {
 

    this.loginService.getroles().subscribe(
      res=>{
        this.roles=res;
        console.log(res);
      },
      err => console.log(err)
    );
    console.log(localStorage.getItem('mail'));
  }

  IniciarSesion(mail,pass,rols){
    console.log('HACE ALGO');

    if(mail.value && pass.value && rols.value){
      console.log('FUNCIONA IF');
      this.sesion.CORREO=mail.value;
      this.sesion.PASSWORD=pass.value;
      this.sesion.TIPO_USUARIO=rols.value;
      this.loginService.iniciarsesion(this.sesion).subscribe(
        res=> {
          console.log(res);
          let mensaje:any =res;
          console.log(res);
          console.log(rols.value);
          localStorage.setItem('mail',res[0][4]);
          localStorage.setItem('id',res[0][0]);
          localStorage.setItem('name',res[0][2]);
          localStorage.setItem('type',String(this.sesion.TIPO_USUARIO));
          localStorage.setItem('imagen',res[0][3]);
          console.log(rols);
          console.log(localStorage.getItem('imagen'));
          if(this.sesion.TIPO_USUARIO==1){         
            window.location.href='/admin';
          }else{
            console.log('Hace algo de iniciar sesion');
            window.location.href='/start';
          }
          
          },
        err=> {
          let mensaje:any =err.error;
          console.log('Hace el error');
          //this.alertService.danger(mensaje.text);
          alert('Usuario no existe')
        }
          );
      mail.value="";
      pass.value="";
      rols.value="";
    }
  }

}
