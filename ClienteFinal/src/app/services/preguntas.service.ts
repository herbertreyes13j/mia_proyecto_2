import { Injectable } from '@angular/core';
import {pregunta} from '../models/pregunta';
import {HttpClient} from '@angular/common/http';
import {ruta} from '../models/rutalocal';
import {respuestaexamen} from '../models/respeustaexamen';
import {examen} from '../models/examen';
import {examenpregunta} from '../models/examenpregunta';
@Injectable({
  providedIn: 'root'
})
export class PreguntasService {
  API_URL = ruta;
  constructor(private http:HttpClient) { }

  insertarpregunta(pregunta:pregunta){
    return this.http.post(`${this.API_URL}/preguntas`,pregunta);
  }
  getlastpregunta(){
    return this.http.get(`${this.API_URL}/preguntas/last`);
  }

  insertarrespuesta(respeustaexamen:respuestaexamen){
    return this.http.post(`${this.API_URL}/preguntas/respuesta`,respeustaexamen);
  }

  getmispregutnas(id:String){
    return this.http.get(`${this.API_URL}/preguntas/mispreguntas/${id}`);
  }

  insertarexamen(examen:examen){
    return this.http.post(`${this.API_URL}/preguntas/insertarexamen`,examen);
 
  }

  getlastexamen(){
    return this.http.get(`${this.API_URL}/preguntas/lastexamen`);
  
  }
  insertarexamenpregunta(examenpregunta:examenpregunta){
    return this.http.post(`${this.API_URL}/preguntas/preguntaexamen`,examenpregunta);
 
  }

}
