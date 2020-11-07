
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';
import loginRoutes from './routes/login.Routes';
import rolcrudRoutes from './routes/rolcrudRoutes';
import facultadcrudRoutes from './routes/facultadcrudRoutes';
import carreracrudRoutes from './routes/carreracrudRoutes';
import cienciacrudRoutes from './routes/cienciacrud.Routes';
import usuariocrudRoutes from './routes/usuariocrud.Routes';
import temacrudRoutes from './routes/temacrud.Routes';
import conversacionRoutes from './routes/conversacion.Routes';
import preguntaRoutes from './routes/pregunta.Routes';
import salaRoutes from './routes/sala.Routes';
import realizarexamenRoutes from './routes/realizarexamen.Routes';
import {mensaje} from './mensaje';
import dbconfig from './DB/dbconfig';
import oracledb from 'oracledb';
import estadisticaRoutes from './routes/estadistica.Routes';

var async =require('async');

var doconnect =function(cb:any) {
    oracledb.getConnection(dbconfig,cb);
    console.log('Conexion exitosa');
};

var resp:string[];
var dorelease = function(conn:any) {
    conn.close(function (err:any) {
      if (err)
        console.error(err.message);
    });
  };

const http= require('http');
const express = require('express');
const app=express();
let http2= http.createServer(app);
const io=require('socket.io')(http2);

class Server{

    constructor(){
       this.config();
       this.routes();
       this.iniciar();
    }

config():void{
    app.set('port',3000);
    app.use(morgan('dev'));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));
    
}
routes():void{
 app.use(indexRoutes);
 app.use('/login',loginRoutes);
 app.use('/rolcrud',rolcrudRoutes);
 app.use('/facultadcrud',facultadcrudRoutes);
 app.use('/carreracrud',carreracrudRoutes);
 app.use('/cienciacrud',cienciacrudRoutes);
 app.use('/usuariocrud',usuariocrudRoutes);
 app.use('/temacrud',temacrudRoutes);
 app.use('/conversacion',conversacionRoutes);
 app.use('/preguntas',preguntaRoutes);
 app.use('/sala',salaRoutes);
 app.use('/maketest',realizarexamenRoutes);
 app.use('/estadisticas',estadisticaRoutes);
}



iniciar(){
    http2.listen(app.get('port'),()=>{
        console.log('Server on port ',app.get('port'));
    });
    io.on('connection',(socket:any)=>{
        console.log(`Socket ${socket.id} added`);
        
        socket.on('StartChat',(idconversacion:String)=>{
            console.log(idconversacion,'Sala');
            socket.join('Chat'+idconversacion);
        });




        
        socket.on('RecibirMensaje',(mensaje:mensaje)=>{
            console.log('sala',mensaje.ID_CONVERSACION);
            async.waterfall(
                [
                    doconnect,
                     function(conn:any, cb:any){
                        conn.execute(
                            `insert into mensaje(hora,emisor,id_conversacion,mensaje)values(:0,:1,:2,:3)`,
                            [new Date(),Number(mensaje.EMISOR),Number(mensaje.ID_CONVERSACION),mensaje.MENSAJE],{autoCommit:true},
                            function(err:any, result:any){
                                if(err){
                                    return cb(err, conn);     
                                }else{
                                    console.log('mandamensaje');
                                    io.to('Chat'+mensaje.ID_CONVERSACION).emit('RecibirMensaje',mensaje);
                                }
                            }
                        );
                    }
                ],
                function(err:any,conn:any){
                    if (err) { console.error("In waterfall error cb: ==>", err, "<=="); 
                    }
                  if (conn){
                    dorelease(conn);
                  }
                }
            );
       
          //console.log(mensaje);
          //socket.emit('RecibirMensaje',mensaje);
        })

    });

    
}
}
const server =new Server();
