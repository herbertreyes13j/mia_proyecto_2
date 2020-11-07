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
class CienciaCrudController {
    insertarciencia(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute(`insert into ciencia(nombre,descripcion,id_carrera) values (:0,:1,:2)`, [req.body.CIENCIA, req.body.DESCRIPCION, Number(req.body.ID_CARRERA)], { autoCommit: true }, function (err, result) {
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
    getfaciencias(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute("select c.nombre as CIENCIA, c.descripcion, ca.nombre as CARRERA, f.nombre as FACULTAD from ciencia c, carrera ca, facultad f where c.id_carrera = ca.id_carrera and ca.id_facultad= f.id_facultad", {}, { outFormat: oracledb_1.default.OBJECT }, function (err, result) {
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
    getciencias(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute("select c.id_ciencia as ID_CIENCIA, c.nombre as CIENCIA, c.descripcion, ca.nombre as CARRERA, f.nombre as FACULTAD from ciencia c, carrera ca, facultad f where c.id_carrera = ca.id_carrera and ca.id_facultad= f.id_facultad", {}, { outFormat: oracledb_1.default.OBJECT }, function (err, result) {
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
    gettodasciencias(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute("select * from ciencia", {}, { outFormat: oracledb_1.default.OBJECT }, function (err, result) {
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
exports.cienciaCrudController = new CienciaCrudController();
