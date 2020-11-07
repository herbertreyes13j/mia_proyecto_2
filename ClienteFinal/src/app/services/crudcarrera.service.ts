import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {carrera} from '../models/carrera';
import {ruta} from '../models/rutalocal';
@Injectable({
  providedIn: 'root'
})
export class CrudcarreraService {

  API_URL = ruta;
  constructor(private http:HttpClient) { }

  crearcarrera(carrera:carrera){
    return this.http.post(`${this.API_URL}/carreracrud`,carrera);
  }

  getfacultades(){
    return this.http.get(`${this.API_URL}/facultadcrud`);
  }

  getcarrera(id:string){
    return this.http.get(`${this.API_URL}/carreracrud/${id}`);
  }

  getcarreras(){
    return this.http.get(`${this.API_URL}/carreracrud/`);
  }
}
