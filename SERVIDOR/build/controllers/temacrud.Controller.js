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
class TemaCrudController {
    gettemas(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute("select  u.nombre, u.id_usuario,t.id_tema, t.titulo, t.descripcion, t.fecha_creacion, t.no_resp, t.solucionado from usuario u, tema t where t.id_usuario=u.id_usuario", {}, { outFormat: oracledb_1.default.OBJECT }, function (err, result) {
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
    gettemaid(req, res) {
        console.log(req.params.id);
        console.log('funciona');
        console.log('hace el id');
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute("select id_tema from tema where id_usuario=:0 and titulo=:1", [Number(req.params.id), req.params.titulo], { outFormat: oracledb_1.default.ARRAY }, function (err, result) {
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
    get1temaid(req, res) {
        console.log(req.params.id);
        console.log('funciona');
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute("select * from tema where id_tema=:0", [Number(req.params.id)], { outFormat: oracledb_1.default.ARRAY }, function (err, result) {
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
        console.log(req.params.idtema);
        console.log('funciona');
        console.log('es esta');
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute("select r.id_respuesta, r.respuesta, r.id_tema,r.fecha, u.nombre, u.fotografia from respuesta r, usuario u where r.id_tema=:0 and u.id_usuario=r.id_usuario order by r.id_respuesta", [Number(req.params.idtema)], { outFormat: oracledb_1.default.OBJECT }, function (err, result) {
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
    insertartema(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute(`insert into tema(titulo,descripcion,fecha_creacion,no_resp,solucionado,id_usuario) values(:0,:1,:2,:3,:4,:5)`, [req.body.TITULO, req.body.DESCRIPCION, new Date(),
                    0, 0, Number(req.body.ID_USUARIO)], { autoCommit: true }, function (err, result) {
                    if (err) {
                        return cb(err, conn);
                    }
                    else {
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
    insertartemaciencia(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute(`insert into tema_ciencia(id_tema,id_ciencia) values (:0,:1)`, [Number(req.body.ID_TEMA), Number(req.body.ID_CIENCIA)], { autoCommit: true }, function (err, result) {
                    if (err) {
                        return cb(err, conn);
                    }
                    else {
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
    insertartemafacultad(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute(`insert into tema_facultad(id_tema,id_facultad) values (:0,:1)`, [Number(req.body.ID_TEMA), Number(req.body.ID_FACULTAD)], { autoCommit: true }, function (err, result) {
                    if (err) {
                        return cb(err, conn);
                    }
                    else {
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
                conn.execute(`insert into respuesta(id_usuario,id_tema,respuesta,fecha) values (:0,:1,:2,:3)`, [Number(req.body.ID_USUARIO), Number(req.body.ID_TEMA), req.body.RESPUESTA, new Date()], { autoCommit: true }, function (err, result) {
                    if (err) {
                        return cb(err, conn);
                    }
                    else {
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
    insertartemacarrera(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute(`insert into tema_carrera(id_tema,id_carrera) values (:0,:1)`, [Number(req.body.ID_TEMA), Number(req.body.ID_CARRERA)], { autoCommit: true }, function (err, result) {
                    if (err) {
                        return cb(err, conn);
                    }
                    else {
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
    updatetema(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute(`update tema set no_resp=no_resp+1 where id_tema=:0`, [Number(req.params.id)], { autoCommit: true }, function (err, result) {
                    if (err) {
                        return cb(err, conn);
                    }
                    else {
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
exports.temaCrudController = new TemaCrudController();
