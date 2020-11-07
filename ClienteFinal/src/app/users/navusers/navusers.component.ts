import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;

}

export let ROUTES:RouteInfo[];
if(localStorage.getItem('type')==="2"){
  ROUTES=[
    {path:'/start/vertemas',title:'Todos los Temas',icon:'fa fa-eye 2x'},
    {path:'/start/comentartema',title:'Ultimo Tema Comentado',icon:'fa fa-commenting-o 2x'},
    {path:'/start/creartema',title:'Crear Tema',icon:'fa fa-pencil 2x'},
    {path:'/start/elegirchat',title:'Chatear', icon:'	fa fa-comments 2x'},
    {path:'/start/crearpregunta',title:'Crear Pregunta', icon:'fa fa-edit 2x'},
    {path:'/start/crearexamen',title:'Crear Examen',icon:'fa fa-reorder 2x'},
    {path:'/start/crearsala',title:'Crear Sala',icon:'fa fa-group 2x'},
    {path:'/start/vernotas',title:'Ver Notas',icon:'fa fa-binoculars 2x'}
  ]
}else{
  ROUTES=[
    {path:'/start/vertemas',title:'Todos los Temas',icon:'fa fa-eye 2x'},
    {path:'/start/comentartema',title:'Ultimo Tema Comentado',icon:'fa fa-commenting-o 2x'},
    {path:'/start/creartema',title:'Crear Tema',icon:'fa fa-pencil 2x'},
    {path:'/start/elegirchat',title:'Chatear', icon:'	fa fa-comments 2x'},
    {path:'/start/buscarsala',title:'Buscar Sala',icon:'fa fa-search 2x'}
  ]
}

@Component({
  selector: 'app-navusers',
  templateUrl: './navusers.component.html',
  styleUrls: ['./navusers.component.scss']
})
export class NavusersComponent implements OnInit {

  constructor() { }
  public menuItems:any[];
  imagen:string;
  ngOnInit() {
    
    this.imagen=localStorage.getItem('imagen');
    console.log(this.imagen);
    this.menuItems=ROUTES.filter(menuItem=>menuItem);
  }

  logout(){
    localStorage.removeItem('mail');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('type');
    localStorage.removeItem('imagen');
  }

}
