import { Injectable } from '@angular/core';
import {ciencia} from '../models/ciencia';
import { HttpClient } from '@angular/common/http';
import {ruta} from '../models/rutalocal';
@Injectable({
  providedIn: 'root'
})
export class CrudcienciaService {

  API_URL = ruta;
  constructor(private http:HttpClient) { }

  crearciencia(ciencia:ciencia){
    return this.http.post(`${this.API_URL}/cienciacrud`,ciencia);
  }
  getciencias(){
    return this.http.get(`${this.API_URL}/cienciacrud`);
  }

  getciencias2(){
    return this.http.get(`${this.API_URL}/cienciacrud/ciencia`);
  }

}
