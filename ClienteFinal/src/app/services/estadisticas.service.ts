import { Injectable } from '@angular/core';
import {ruta} from '../models/rutalocal';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  API_URL = ruta;
  constructor(private http:HttpClient) { }

  getestadistica1(ciencia:String){
    return this.http.get(`${this.API_URL}/estadisticas/estadistica1/${ciencia}`);
  }

  getestadistica2(ciencia:String){
    return this.http.get(`${this.API_URL}/estadisticas/estadistica2/${ciencia}`);
  }
  getestadistica3(){
    return this.http.get(`${this.API_URL}/estadisticas/estadistica3`);
  }
  getestadistica4g(){
    return this.http.get(`${this.API_URL}/estadisticas/estadistica4general`);
  }
  getestadistica4(ciencia:String){
    return this.http.get(`${this.API_URL}/estadisticas/estadistica4/${ciencia}`);
  }
  getestadistica5g(){
    return this.http.get(`${this.API_URL}/estadisticas/estadistica5general`);
  }
  getestadistica5(ciencia:String){
    return this.http.get(`${this.API_URL}/estadisticas/estadistica4/${ciencia}`);
  }
}
