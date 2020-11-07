"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const login_Routes_1 = __importDefault(require("./routes/login.Routes"));
const rolcrudRoutes_1 = __importDefault(require("./routes/rolcrudRoutes"));
const facultadcrudRoutes_1 = __importDefault(require("./routes/facultadcrudRoutes"));
const carreracrudRoutes_1 = __importDefault(require("./routes/carreracrudRoutes"));
const cienciacrud_Routes_1 = __importDefault(require("./routes/cienciacrud.Routes"));
const usuariocrud_Routes_1 = __importDefault(require("./routes/usuariocrud.Routes"));
const temacrud_Routes_1 = __importDefault(require("./routes/temacrud.Routes"));
const conversacion_Routes_1 = __importDefault(require("./routes/conversacion.Routes"));
const pregunta_Routes_1 = __importDefault(require("./routes/pregunta.Routes"));
const sala_Routes_1 = __importDefault(require("./routes/sala.Routes"));
const realizarexamen_Routes_1 = __importDefault(require("./routes/realizarexamen.Routes"));
const dbconfig_1 = __importDefault(require("./DB/dbconfig"));
const oracledb_1 = __importDefault(require("oracledb"));
const estadistica_Routes_1 = __importDefault(require("./routes/estadistica.Routes"));
var async = require('async');
var doconnect = function (cb) {
    oracledb_1.default.getConnection(dbconfig_1.default, cb);
    console.log('Conexion exitosa');
};
var resp;
var dorelease = function (conn) {
    conn.close(function (err) {
        if (err)
            console.error(err.message);
    });
};
const http = require('http');
const express = require('express');
const app = express();
let http2 = http.createServer(app);
const io = require('socket.io')(http2);
class Server {
    constructor() {
        this.config();
        this.routes();
        this.iniciar();
    }
    config() {
        app.set('port', 3000);
        app.use(morgan_1.default('dev'));
        app.use(cors_1.default());
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
    }
    routes() {
        app.use(indexRoutes_1.default);
        app.use('/login', login_Routes_1.default);
        app.use('/rolcrud', rolcrudRoutes_1.default);
        app.use('/facultadcrud', facultadcrudRoutes_1.default);
        app.use('/carreracrud', carreracrudRoutes_1.default);
        app.use('/cienciacrud', cienciacrud_Routes_1.default);
        app.use('/usuariocrud', usuariocrud_Routes_1.default);
        app.use('/temacrud', temacrud_Routes_1.default);
        app.use('/conversacion', conversacion_Routes_1.default);
        app.use('/preguntas', pregunta_Routes_1.default);
        app.use('/sala', sala_Routes_1.default);
        app.use('/maketest', realizarexamen_Routes_1.default);
        app.use('/estadisticas', estadistica_Routes_1.default);
    }
    iniciar() {
        http2.listen(app.get('port'), () => {
            console.log('Server on port ', app.get('port'));
        });
        io.on('connection', (socket) => {
            console.log(`Socket ${socket.id} added`);
            socket.on('StartChat', (idconversacion) => {
                console.log(idconversacion, 'Sala');
                socket.join('Chat' + idconversacion);
            });
            socket.on('RecibirMensaje', (mensaje) => {
                console.log('sala', mensaje.ID_CONVERSACION);
                async.waterfall([
                    doconnect,
                    function (conn, cb) {
                        conn.execute(`insert into mensaje(hora,emisor,id_conversacion,mensaje)values(:0,:1,:2,:3)`, [new Date(), Number(mensaje.EMISOR), Number(mensaje.ID_CONVERSACION), mensaje.MENSAJE], { autoCommit: true }, function (err, result) {
                            if (err) {
                                return cb(err, conn);
                            }
                            else {
                                console.log('mandamensaje');
                                io.to('Chat' + mensaje.ID_CONVERSACION).emit('RecibirMensaje', mensaje);
                            }
                        });
                    }
                ], function (err, conn) {
                    if (err) {
                        console.error("In waterfall error cb: ==>", err, "<==");
                    }
                    if (conn) {
                        dorelease(conn);
                    }
                });
                //console.log(mensaje);
                //socket.emit('RecibirMensaje',mensaje);
            });
        });
    }
}
const server = new Server();
