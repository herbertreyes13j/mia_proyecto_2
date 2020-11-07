import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {ruta} from '../models/rutalocal';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {conversacion} from '../models/conversacion';
import {mensaje} from '../models/mensaje';
export enum IOEventName{
  mensajes="mensajes"
}

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  private socket:io.Socket;
  API_URL = ruta;
  constructor(private http:HttpClient) {
    this.socket=io(ruta);
   }

   iniciarconversacion(idconversacion:String){
   
    this.socket.emit('StartChat',idconversacion);
   }

   insertarconversacion(conversacion:conversacion){
     return this.http.post(`${this.API_URL}/conversacion/`,conversacion);
   }

   getconversacion(id:string,id2:string){
    return this.http.get(`${this.API_URL}/conversacion/${id}/${id2}`);
   }

   getmensajes(id:String){
     return this.http.get(`${this.API_URL}/conversacion/${id}`);
   }

   mandarmensaje(mensaje:mensaje){
     this.socket.emit('RecibirMensaje',mensaje);
   }
   public getMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('RecibirMensaje', (message) => {
            observer.next(message);
        });
    });
} 

public sendMessage(message) {
  this.socket.emit('RecibirMensaje', message);
}
   public genuevosmensajes=()=>{
    return Observable.create((observer)=>{
      this.socket.on('RecibirMensaje',(mensaje)=>{
        observer.next(mensaje);
        console.log(mensaje);
        console.log('Hace algo aca');
      })
    })
   }

   public onEvent<T>(event:IOEventName):Observable<T[]>{
     return new Observable<T[]>(observer=>{
       this.socket.on(event,(data:T[])=>observer.next(data));
     })
   }
}
