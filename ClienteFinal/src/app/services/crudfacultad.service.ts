import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {facultad} from '../models/facultad';
import {ruta} from '../models/rutalocal';
@Injectable({
  providedIn: 'root'
})
export class CrudfacultadService {


  API_URL = ruta;
  constructor(private http:HttpClient) { }

  crearfacultad(facultad:facultad){
    return this.http.post(`${this.API_URL}/facultadcrud`,facultad);
  }

  getfacultades(){
    return this.http.get(`${this.API_URL}/facultadcrud`);
  }
}
