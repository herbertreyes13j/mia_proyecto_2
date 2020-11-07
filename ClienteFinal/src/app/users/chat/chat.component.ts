import { Component, OnInit } from '@angular/core';
import {MessengerService, IOEventName} from '../../services/messenger.service';
import {conversacion} from '../../models/conversacion';
import {mensaje} from '../../models/mensaje';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private ms:MessengerService) { }
  idconversacion:any=[];
  nuevaconversacion:conversacion={} as any;
  mensajes:any=[];

  idemisor:String;

  message: string;
  messages: string[] = [];
  ngOnInit() {
    this.ms.getMessages()
    .subscribe((message: mensaje) => {
      console.log(message);
      this.mensajes.push(message);
    });
    /*
    this.ms.onEvent<any>(IOEventName.mensajes).subscribe(
      
    val=>{
      console.log('Entra aca');
      this.mensajes2=new Array();
        if(val.length==undefined){
          let a:any=val;
          this.mensajes2[0]=a;
        }else{
          this.mensajes2=val;
        }
        console.log(this.mensajes2);
    }
    );
    */
    /*
    this.ms.genuevosmensajes().subscribe((message)=>{
      console.log('entra aca');
      console.log(message);
      this.mensajes.push(message);
    });
*/
    console.log(localStorage.getItem('id'));
    console.log(localStorage.getItem('id_user2'));
    this.idemisor=localStorage.getItem('id');
    this.ms.getconversacion(localStorage.getItem('id'),localStorage.getItem('id_user2')).subscribe(
      res=>{
       this.idconversacion=res;
       if(this.idconversacion.length==0 || this.idconversacion===undefined){
          this.nuevaconversacion.ID1=localStorage.getItem('id');
          this.nuevaconversacion.ID2=localStorage.getItem('id_user2');
        this.ms.insertarconversacion(this.nuevaconversacion).subscribe(
          res=>{
            this.ms.getconversacion(localStorage.getItem('id'),localStorage.getItem('id_user2')).subscribe(
              res=>{
                this.idconversacion=res;
                console.log(this.idconversacion);
                this.ms.getmensajes(this.idconversacion[0].ID_CONVERSACION).subscribe(
                  res=>{
                    
                    this.mensajes=res;
                    this.ms.iniciarconversacion(this.idconversacion[0].ID_CONVERSACION);
                  }
                );
              }
            );
          }
        );
       }else{
         console.log(this.idconversacion[0].ID_CONVERSACION);
         this.ms.getmensajes(this.idconversacion[0].ID_CONVERSACION).subscribe(
          res=>{
            this.ms.iniciarconversacion(this.idconversacion[0].ID_CONVERSACION);
            this.mensajes=res;
            console.log(this.mensajes);
          }
        );
       }
      },
      err=>{
        console.log('error');
      }
    );
      
  }

    public mandarmensaje(mensaje){
      console.log(mensaje.value);
      this.ms.mandarmensaje(mensaje.value);
      
      this.ms.sendMessage(mensaje.value);
      


      
      mensaje.value="";
    }

    sendMessage() {
      let temporal:mensaje={} as any;
      temporal.MENSAJE=this.message;
      temporal.EMISOR=Number(this.idemisor);
      temporal.ID_CONVERSACION=Number(this.idconversacion[0].ID_CONVERSACION);
      temporal.HORA=new Date();
      temporal.ID_MENSAJE=0;
      this.ms.sendMessage(temporal);
      this.message = '';
    }
}
