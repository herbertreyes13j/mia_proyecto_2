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
class PreguntaController {
    insertarpregunta(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute(`insert into pregunta(tipopregunta,pregunta,id_usuario) values(:0,:1,:2)`, [Number(req.body.TIPOPREGUNTA), req.body.PREGUNTA, Number(req.body.ID_USUARIO)], { autoCommit: true }, function (err, result) {
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
    insertarrespuesta(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute(`insert into respuesta_examen(valor,escorrecta,id_pregunta) values(:0,:1,:2) `, [req.body.VALOR, Number(req.body.CORRECTA), Number(req.body.ID_PREGUNTA)], { autoCommit: true }, function (err, result) {
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
    insertarexamen(req, res) {
        console.log(req.body);
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute(`insert into examen(titulo,id_tema,id_ciencia,fecha,fecha_modificacion,id_catedratico) values(:0,:1,:2,:3,:4,:5)`, [req.body.TITULO, Number(req.body.ID_TEMA), Number(req.body.ID_CIENCIA),
                    new Date(), new Date(), Number(req.body.ID_CATEDRATICO)], { autoCommit: true }, function (err, result) {
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
    insertarexamenpregunta(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute(`insert into pregunta_examen(id_pregunta,id_examen) values (:0,:1)`, [Number(req.body.ID_PREGUNTA), Number(req.body.ID_EXAMEN)], { autoCommit: true }, function (err, result) {
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
    getlastinsertada(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute("select max(id_pregunta) as id_pregunta from pregunta", {}, { outFormat: oracledb_1.default.ARRAY }, function (err, result) {
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
    getlastexamen(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute("select max(id_examen) as id_examen from examen", {}, { outFormat: oracledb_1.default.ARRAY }, function (err, result) {
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
    getpreguntasusuario(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute("select * from pregunta where id_usuario=:0 order by id_pregunta", [req.params.id], { outFormat: oracledb_1.default.OBJECT }, function (err, result) {
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
}
exports.preguntaController = new PreguntaController();
