import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {ruta} from '../models/rutalocal';
import {Observable}  from 'rxjs/';
@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {
  private url= ruta;
  private socket;
  constructor() {
    this.socket=io(this.url);
   }

   public sendMessage(message) {
    this.socket.emit('new-message', message);
}
public getMessages = () => {
  return Observable.create((observer) => {
      this.socket.on('new-message', (message) => {
          observer.next(message);
      });
  });
}
}
