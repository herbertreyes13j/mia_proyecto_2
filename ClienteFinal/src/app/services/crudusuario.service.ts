import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {carrerausuario} from '../models/carrerausuario';
import {rolusuario} from '../models/rolusuario';
import {usuario} from '../models/usuario';
import {ruta} from '../models/rutalocal';
@Injectable({
  providedIn: 'root'
})
export class CrudusuarioService {
  API_URL = ruta;
  constructor(private http:HttpClient) { }

  crearusuario(usuario:usuario){
    return this.http.post(`${this.API_URL}/usuariocrud`,usuario);
  }

  crearsolusuario(rolusuario:rolusuario){
    return this.http.post(`${this.API_URL}/usuariocrud/rol`,rolusuario);
  }

  crearcarrerausuario(carrerausuario:carrerausuario){
    return this.http.post(`${this.API_URL}/usuariocrud/carrera`,carrerausuario);
  }

  getusuarioid(correo:String){
    return this.http.get(`${this.API_URL}/usuariocrud/${correo}`);
  }

  getusuariodiferente(id:String){
    return this.http.get(`${this.API_URL}/usuariocrud/diferente/${id}`);
  }
}
