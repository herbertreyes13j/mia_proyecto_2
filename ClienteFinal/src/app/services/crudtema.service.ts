import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ruta} from '../models/rutalocal';
import {temacarrera} from '../models/temacarrera';
import {temaciencia} from '../models/temaciencia';
import {temafacultad} from '../models/temafacultad';
import {tema} from '../models/tema';
import {respuesta} from '../models/respuesta';
@Injectable({
  providedIn: 'root'
})
export class CrudtemaService {
  API_URL = ruta;
  constructor(private http:HttpClient) { }

  gettemas(){
    return this.http.get(`${this.API_URL}/temacrud`)
  }

  insertartema(tema:tema){
    return this.http.post(`${this.API_URL}/temacrud`,tema);
  }

  getidtema(id:String, titulo:String){
    console.log(id);
    console.log(titulo);
    return this.http.get(`${this.API_URL}/temacrud/gettemaid/${id}/${titulo}`);
  }
  
  insertartemafacultad(temafacultad:temafacultad){
    return this.http.post(`${this.API_URL}/temacrud/facultad`,temafacultad);
  }
  insertarrespuesta(respuesta:respuesta){
    return this.http.post(`${this.API_URL}/temacrud/insertarrespuesta`,respuesta);
  }

  insertartemacarrera(temacarrera:temacarrera){
    return this.http.post(`${this.API_URL}/temacrud/carrera`,temacarrera);
  }

  insertartemaciencia(temaciencia:temaciencia){
    return this.http.post(`${this.API_URL}/temacrud/ciencia`,temaciencia);
  }

  get1tema(id:String){
    return this.http.get(`${this.API_URL}/temacrud/get1tema/${id}`);
  }

  getrespuesta(idtema:String){
    console.log(idtema);
    return this.http.get(`${this.API_URL}/temacrud/respuesta/${idtema}`);
  }

  updatetema(id:String){
    return this.http.put(`${this.API_URL}/temacrud/${id}`,id);
  }
}
