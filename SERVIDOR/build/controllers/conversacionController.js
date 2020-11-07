"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
class ConversacionController {
    getidconversacion(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute("select id_conversacion from conversacion where (id_user1=:0 or id_user1=:1) and (id_user2=:0 or id_user2=:1)", [Number(req.params.id1), Number(req.params.id2)], { outFormat: oracledb_1.default.OBJECT }, function (err, result) {
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
    getmensajes(req, res) {
        console.log(req.params.id);
        async.waterfall([
            doconnect,
            function (conn, cb) {
                return __awaiter(this, void 0, void 0, function* () {
                    conn.execute("select * from mensaje where id_conversacion=:0 order by id_mensaje", [Number(req.params.id)], { outFormat: oracledb_1.default.OBJECT }, function (err, result) {
                        if (err) {
                            return cb(err, conn);
                        }
                        else {
                            res.send(result.rows);
                        }
                    });
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
    insertarconversacion(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute(`insert into conversacion(id_user1,id_user2,estado) values(:0,:1,1)`, [Number(req.body.ID1), Number(req.body.ID2)], { autoCommit: true }, function (err, result) {
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
exports.conversacionController = new ConversacionController();
