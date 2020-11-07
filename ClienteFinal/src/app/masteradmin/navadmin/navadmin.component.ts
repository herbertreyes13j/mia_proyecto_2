import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;

}

export let ROUTES:RouteInfo[];
ROUTES=[
  {path:'/admin/insertaruser', title:'Insertar Usuario', icon:'fa fa-plus fa-2x'},
  {path:'/admin/insertarrol', title:'Insertar Rol', icon:'fa fa-briefcase fa-2x'},
  {path:'/admin/insertarfacultad',title:'Insertar Facultad',icon:'fa fa-building-o fa-2x'},
  {path:'/admin/mostrarfacultad', title:'Mostrar Facultad',icon:'fa fa-eye 2x'},
  {path:'/admin/insertarcarrera',title:'Insertar Carrera',icon:'fa fa-mortar-board fa-2x'},
  {path:'/admin/insertarciencia',title:'Insertar Ciencia', icon:'fa fa-flask fa-2x'},
  {path:'/admin/mostrarciencia',title:'Mostrar Ciencias',icon:'fa fa-eye 2x'},
  {path:'/admin/estadisticas',title:'Estadisticas', icon:'	fa fa-bar-chart 2x'}
  
]


@Component({
  selector: 'app-navadmin',
  templateUrl: './navadmin.component.html',
  styleUrls: ['./navadmin.component.scss']

})
export class NavadminComponent implements OnInit {
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
