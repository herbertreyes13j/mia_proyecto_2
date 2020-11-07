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
class UsuarioCrudController {
    getusuarioid(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute("select id_usuario from usuario where correo=:0", [req.params.correo], { outFormat: oracledb_1.default.ARRAY }, function (err, result) {
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
    getusuariodiferente(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute("select distinct u.id_usuario, u.carnet, u.nombre, u.fotografia, u.correo from usuario u, rol_usuario rs where rs.id_rol!=1 and u.id_usuario=rs.id_usuario and u.id_usuario!=:0", [req.params.id], { outFormat: oracledb_1.default.OBJECT }, function (err, result) {
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
    insertarusuario(req, res) {
        console.log(req.body);
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute(`insert into usuario(carnet,nombre,fotografia,correo,telefono,clave_acceso) values(:0,:1,:2,:3,:4,:5)`, [Number(req.body.CARNET), req.body.NOMBRE, req.body.FOTOGRAFIA,
                    req.body.CORREO, Number(req.body.TELEFONO), req.body.CLAVE_ACCESO], { autoCommit: true }, function (err, result) {
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
    insertarusuariocarrera(req, res) {
        console.log(req.body);
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute(`insert into carrera_usuario(id_carrera,id_usuario) values(:0,:1)`, [Number(req.body.ID_CARRERA), Number(req.body.ID_USUARIO)], { autoCommit: true }, function (err, result) {
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
    insertarusuariorol(req, res) {
        console.log(req.body);
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute(`insert into rol_usuario(id_rol,id_usuario)VALUES(:0,:1)`, [Number(req.body.ID_ROL), Number(req.body.ID_USUARIO)], { autoCommit: true }, function (err, result) {
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
exports.usuarioCrudController = new UsuarioCrudController();
