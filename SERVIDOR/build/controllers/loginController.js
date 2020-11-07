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
class LoginController {
    gettiposusuarios(req, res) {
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
    insertar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            let idusuario;
            async.waterfall([
                doconnect,
                function (conn, cb) {
                    conn.execute(`select * from usuario where id_usuario=(select id_usuario from rol_usuario where id_rol=:0 and id_usuario=(select id_usuario from usuario where correo=:1 and clave_acceso=:2))`, [Number(req.body.TIPO_USUARIO), req.body.CORREO, req.body.PASSWORD], { outFormat: oracledb_1.default.ARRAY }, function (err, result) {
                        if (err) {
                            console.log(req.body.CORREO);
                            console.log(err);
                            return cb(err, conn);
                        }
                        else {
                            if (result.rows.length == 1) {
                                console.log(result.rows);
                                res.send(result.rows);
                            }
                            else {
                                res.send('USUARIO NO EXISTE');
                            }
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
        });
    }
}
exports.loginController = new LoginController();
