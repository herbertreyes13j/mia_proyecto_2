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
class RolCrudController {
    getroles(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute("select * from rol", {}, { outFormat: oracledb_1.default.OBJECT }, function (err, result) {
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
                conn.execute(`insert into rol(rol) values(:0)`, [req.body.ROL], { autoCommit: true }, function (err, result) {
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
exports.rolCrudController = new RolCrudController();
