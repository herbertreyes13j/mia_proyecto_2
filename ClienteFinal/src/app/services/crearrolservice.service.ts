import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {rol} from '../models/rol';
import {ruta} from '../models/rutalocal';

@Injectable({
  providedIn: 'root'
})

export class CrearrolserviceService {
  API_URL = ruta;
  constructor(private http:HttpClient) { }

  crearrol(Rol:rol){
    return this.http.post(`${this.API_URL}/rolcrud`,Rol);
  }

  getroles(){
    return this.http.get(`${this.API_URL}/rolcrud`);
  }
}
