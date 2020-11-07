import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {sesion} from '../models/sesion';
import {ruta} from '../models/rutalocal';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_URL = ruta;
  constructor(private http:HttpClient) { }

  getroles(){
    return this.http.get(`${this.API_URL}/login`);
  }

  iniciarsesion(sesion:sesion){
    return this.http.post(`${this.API_URL}/login`,sesion);
  }
}
