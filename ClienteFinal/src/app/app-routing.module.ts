import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminpageComponent } from './masteradmin/adminpage/adminpage.component';

import {LoginGuard} from './guards/login.guard';
import {NotLoginGuard} from './guards/notlogin.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavadminComponent } from './masteradmin/navadmin/navadmin.component';
import { InsertarusuarioComponent } from './masteradmin/insertarusuario/insertarusuario.component';
import { InsertarrolComponent } from './masteradmin/insertarrol/insertarrol.component';
import { InsertarfacultadComponent } from './masteradmin/insertarfacultad/insertarfacultad.component';
import { InsertarcarreraComponent } from './masteradmin/insertarcarrera/insertarcarrera.component';
import { MostrarfacultadesComponent } from './masteradmin/mostrarfacultades/mostrarfacultades.component';
import { InsertarcienciaComponent } from './masteradmin/insertarciencia/insertarciencia.component';
import { MostrarcienciaComponent } from './masteradmin/mostrarciencia/mostrarciencia.component';
import { StartpageComponent } from './users/startpage/startpage.component';
import { VertemasComponent } from './users/vertemas/vertemas.component';
import { ChatComponent } from './users/chat/chat.component';
import { ElegirparachatComponent } from './users/elegirparachat/elegirparachat.component';
import { CreartemaComponent } from './users/creartema/creartema.component';
import { Chat2Component } from './users/chat2/chat2.component';
import { ComentartemaComponent } from './users/comentartema/comentartema.component';
import { CrearpreguntaComponent } from './users/crearpregunta/crearpregunta.component';
import { CrearexamenComponent } from './users/crearexamen/crearexamen.component';
import { CrearsalaComponent } from './users/crearsala/crearsala.component';
import { BuscarsalaComponent } from './users/buscarsala/buscarsala.component';
import { RealizarexamenComponent } from './users/realizarexamen/realizarexamen.component';
import { VernotasComponent } from './users/vernotas/vernotas.component';
import { EstadisticasComponent } from './masteradmin/estadisticas/estadisticas.component';

 
const routes: Routes = [
  {
    path : '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate:[NotLoginGuard] 
    
  },
  {
    path: 'admin',
    component: AdminpageComponent,
    children:[
      {path:'',redirectTo:'insertaruser',pathMatch:'full',},
      {path:'insertaruser', component:InsertarusuarioComponent},
      {path:'insertarrol', component:InsertarrolComponent},
      {path:'insertarfacultad',component:InsertarfacultadComponent},
      {path:'insertarcarrera', component:InsertarcarreraComponent},
      {path:'mostrarfacultad',component:MostrarfacultadesComponent},
      {path:'insertarciencia',component:InsertarcienciaComponent},
      {path:'mostrarciencia',component:MostrarcienciaComponent},
      {path:'estadisticas',component:EstadisticasComponent}

    ]
    ,canActivate:[LoginGuard],
    
  },
  {
    path: 'start',
    component:StartpageComponent,
    children:[
      {path:'',redirectTo:'vertemas',pathMatch:'full'},
      {path:'vertemas',component:VertemasComponent},
      {path:'elegirchat',component:ElegirparachatComponent},
      {path:'creartema',component:CreartemaComponent},
      {path:'comentartema',component:ComentartemaComponent},
      {path:'crearpregunta',component:CrearpreguntaComponent},
      {path:'crearexamen',component:CrearexamenComponent},
      {path:'crearsala',component:CrearsalaComponent},
      {path:'buscarsala',component:BuscarsalaComponent},
      {path:'chat',component:ChatComponent},
      {path:'vernotas',component:VernotasComponent}
    ],
    canActivate:[LoginGuard]
  }
  ,
  {
    path:'notaccess',
    component: PageNotFoundComponent
  },
  {
    path: 'navadmin',
    component:NavadminComponent
  },

  {path:'realizarexamen',component:RealizarexamenComponent},
  {
    path: '**',
    redirectTo: 'notaccess'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
