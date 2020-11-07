"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = __importDefault(require("../DB/dbconfig"));
const oracledb_1 = __importDefault(require("oracledb"));
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
class RealizarExamenController {
    getpreguntas(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute("select p.ID_PREGUNTA, p.TIPOPREGUNTA, p.PREGUNTA from pregunta_examen pe, pregunta p where id_examen=:0 and pe.ID_PREGUNTA = p.ID_PREGUNTA", [req.params.idexamen], { outFormat: oracledb_1.default.OBJECT }, function (err, result) {
                    if (err) {
                        return cb(err, conn);
                    }
                    else {
                        res.send(result.rows);
                    }
                });
            }
        ], function (err, conn) {
            if (err) {
                console.error("In waterfall error cb: ==>", err, "<==");
                res.send('ERROR');
            }
            if (conn) {
                dorelease(conn);
            }
        });
    }
    getrespuestas(req, res) {
        console.log(req.params.idpregunta);
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute("select * from respuesta_examen where id_pregunta=:0", [req.params.idpregunta], { outFormat: oracledb_1.default.OBJECT }, function (err, result) {
                    if (err) {
                        return cb(err, conn);
                    }
                    else {
                        res.send(result.rows);
                    }
                });
            }
        ], function (err, conn) {
            if (err) {
                console.error("In waterfall error cb: ==>", err, "<==");
                res.send('ERROR');
            }
            if (conn) {
                dorelease(conn);
            }
        });
    }
    getsalas(req, res) {
        console.log(req.params.idpregunta);
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute("select s.id_sala, s.nombre from sala s, examen e where e.id_catedratico=:0 and e.id_examen = s.id_examen", [Number(req.params.idusuario)], { outFormat: oracledb_1.default.OBJECT }, function (err, result) {
                    if (err) {
                        return cb(err, conn);
                    }
                    else {
                        res.send(result.rows);
                    }
                });
            }
        ], function (err, conn) {
            if (err) {
                console.error("In waterfall error cb: ==>", err, "<==");
                res.send('ERROR');
            }
            if (conn) {
                dorelease(conn);
            }
        });
    }
    getnotas(req, res) {
        console.log(req.params.idpregunta);
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute("select u.carnet as CARNET, u.nombre AS NOMBRE, es.NOTA as NOTA, s.NOMBRE as SALA  from estudiante_sala es, usuario u, sala s where u.id_usuario = es.id_estudiante and s.nombre=:0 and es.id_sala = s.id_sala", [req.params.sala], { outFormat: oracledb_1.default.OBJECT }, function (err, result) {
                    if (err) {
                        return cb(err, conn);
                    }
                    else {
                        res.send(result.rows);
                    }
                });
            }
        ], function (err, conn) {
            if (err) {
                console.error("In waterfall error cb: ==>", err, "<==");
                res.send('ERROR');
            }
            if (conn) {
                dorelease(conn);
            }
        });
    }
    buscarsala(req, res) {
        console.log(req.params.sala);
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute("select * from sala where NOMBRE=:0", [req.params.sala], { outFormat: oracledb_1.default.ARRAY }, function (err, result) {
                    if (err) {
                        return cb(err, conn);
                    }
                    else {
                        res.send(result.rows);
                    }
                });
            }
        ], function (err, conn) {
            if (err) {
                console.error("In waterfall error cb: ==>", err, "<==");
                res.send('ERROR');
            }
            if (conn) {
                dorelease(conn);
            }
        });
    }
    insertarsala(req, res) {
        console.log(req.body);
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute(`insert into sala(nombre,tiempo,estado,id_examen) values(:0,:1,:2,:3)`, [req.body.NOMBRE, Number(req.body.TIEMPO), Number(req.body.ESTADO), Number(req.body.ID_EXAMEN)], { autoCommit: true }, function (err, result) {
                    if (err) {
                        return cb(err, conn);
                    }
                    else {
                        console.log(result);
                        res.send(result.rowsaffected);
                    }
                });
            }
        ], function (err, conn) {
            if (err) {
                console.error("In waterfall error cb: ==>", err, "<==");
                res.send('ERROR');
            }
            if (conn) {
                dorelease(conn);
            }
        });
    }
    insertarestudiantesala(req, res) {
        console.log(req.body);
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute(`insert into estudiante_sala(id_sala,id_estudiante,nota) values(:0,:1,:2)`, [Number(req.body.ID_SALA), Number(req.body.ID_ESTUDIANTE), 0], { autoCommit: true }, function (err, result) {
                    if (err) {
                        return cb(err, conn);
                    }
                    else {
                        console.log(result);
                        res.send(result.rowsaffected);
                    }
                });
            }
        ], function (err, conn) {
            if (err) {
                console.error("In waterfall error cb: ==>", err, "<==");
                res.send('ERROR');
            }
            if (conn) {
                dorelease(conn);
            }
        });
    }
    actualizarnota(req, res) {
        console.log(req.body);
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute(`update estudiante_sala set NOTA=:0 where id_sala=:1 and id_estudiante=:2`, [Number(req.body.NOTA), Number(req.body.ID_SALA), Number(req.body.ID_ESTUDIANTE)], { autoCommit: true }, function (err, result) {
                    if (err) {
                        return cb(err, conn);
                    }
                    else {
                        console.log(result);
                        res.send(result.rowsaffected);
                    }
                });
            }
        ], function (err, conn) {
            if (err) {
                console.error("In waterfall error cb: ==>", err, "<==");
                res.send('ERROR');
            }
            if (conn) {
                dorelease(conn);
            }
        });
    }
}
exports.realizarexamenController = new RealizarExamenController();
