import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ruta} from '../models/rutalocal';
import {usuariosala} from '../models/usuariosala';

@Injectable({
  providedIn: 'root'
})
export class RealizarexamenService {
  API_URL = ruta;
  constructor(private http:HttpClient) { }

  getpreguntas(idexamen:String){
    return this.http.get(`${this.API_URL}/maketest/preguntas/${idexamen}`)
  }

  getrespuestas(idpregunta:String){
    return this.http.get(`${this.API_URL}/maketest/respuestas/${idpregunta}`)
  }

  insertarsala(usuariosala:usuariosala){
    return this.http.post(`${this.API_URL}/maketest/salausuario`,usuariosala);
  }
  
  actualizarnota(usuariosala:usuariosala){
    return this.http.post(`${this.API_URL}/maketest/actualizarnota`,usuariosala);
  }

  getmisalas(idusuario:String){
    return this.http.get(`${this.API_URL}/maketest/getmisala/${idusuario}`)
  }

  getnotas(sala:String){
    return this.http.get(`${this.API_URL}/maketest/notas/${sala}`)
  }


}
