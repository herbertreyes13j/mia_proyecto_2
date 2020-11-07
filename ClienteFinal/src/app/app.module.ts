import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AlertModule} from 'ngx-alerts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AdminpageComponent } from './masteradmin/adminpage/adminpage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavadminComponent } from './masteradmin/navadmin/navadmin.component';
import { InsertarusuarioComponent } from './masteradmin/insertarusuario/insertarusuario.component';
import { InsertarrolComponent } from './masteradmin/insertarrol/insertarrol.component';
import { InsertarfacultadComponent } from './masteradmin/insertarfacultad/insertarfacultad.component';
import { InsertarcarreraComponent } from './masteradmin/insertarcarrera/insertarcarrera.component';
import { MostrarfacultadesComponent } from './masteradmin/mostrarfacultades/mostrarfacultades.component';
import { InsertarcienciaComponent } from './masteradmin/insertarciencia/insertarciencia.component';
import { MostrarcienciaComponent } from './masteradmin/mostrarciencia/mostrarciencia.component';
import { NavusersComponent } from './users/navusers/navusers.component';
import { StartpageComponent } from './users/startpage/startpage.component';
import { VertemasComponent } from './users/vertemas/vertemas.component';
import { ChatComponent } from './users/chat/chat.component';
import { ElegirparachatComponent } from './users/elegirparachat/elegirparachat.component';
import { PersonasComponent } from './users/personas/personas.component';

import {MessengerService} from './services/messenger.service';
import {MensajeriaService} from './services/mensajeria.service';
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



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminpageComponent,
    PageNotFoundComponent,
    NavadminComponent,
    InsertarusuarioComponent,
    InsertarrolComponent,
    InsertarfacultadComponent,
    InsertarcarreraComponent,
    MostrarfacultadesComponent,
    InsertarcienciaComponent,
    MostrarcienciaComponent,
    NavusersComponent,
    StartpageComponent,
    VertemasComponent,
    ChatComponent,
    ElegirparachatComponent,
    PersonasComponent,
    CreartemaComponent,
    Chat2Component,
    ComentartemaComponent,
    CrearpreguntaComponent,
    CrearexamenComponent,
    CrearsalaComponent,
    BuscarsalaComponent,
    RealizarexamenComponent,
    VernotasComponent,
    EstadisticasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'}),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [  
    MensajeriaService,
    MessengerService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
