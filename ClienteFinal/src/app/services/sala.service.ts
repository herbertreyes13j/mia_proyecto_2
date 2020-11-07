import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ruta} from '../models/rutalocal';
import {sala} from '../models/sala';
@Injectable({
  providedIn: 'root'
})
export class SalaService {
  API_URL = ruta;
  constructor(private http:HttpClient) { }

  getmisexamenes(id:String){
   return this.http.get(`${this.API_URL}/sala/misexamenes/${id}`);
  }

  insertarsala(sala:sala){
    return this.http.post(`${this.API_URL}/sala/nuevasala`,sala);
  }

  buscarsala(sala:string){
    return this.http.get(`${this.API_URL}/sala/buscarsala/${sala}`);
  }

}
