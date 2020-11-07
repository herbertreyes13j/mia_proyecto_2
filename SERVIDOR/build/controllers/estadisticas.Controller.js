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
class EstadisticaController {
    getestadistica1(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute(`select * from (select u.Nombre,u.fotografia, count(r.Id_Respuesta) as CANTIDAD from respuesta r, usuario u, tema_ciencia tc, tema t, rol_usuario ru
                        where tc.id_ciencia=:0 and tc.id_tema=t.id_tema and r.id_tema=tc.id_tema and u.id_usuario=r.id_usuario and ru.id_rol=2 and ru.id_usuario=u.id_usuario
                        group by u.Nombre,u.fotografia
                        order by CANTIDAD desc
                        )where rownum <=3`, [Number(req.params.ciencia)], { outFormat: oracledb_1.default.OBJECT }, function (err, result) {
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
    getestadistica2(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute(`select * from (select u.Nombre,u.fotografia, count(r.Id_Respuesta) as CANTIDAD from respuesta r, usuario u, tema_ciencia tc, tema t, rol_usuario ru
                        where tc.id_ciencia=:0 and tc.id_tema=t.id_tema and r.id_tema=tc.id_tema and u.id_usuario=r.id_usuario and ru.id_rol!=2 and ru.id_usuario=u.id_usuario
                        group by u.Nombre,u.fotografia 
                        order by CANTIDAD desc
                        )where rownum <=10`, [Number(req.params.ciencia)], { outFormat: oracledb_1.default.OBJECT }, function (err, result) {
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
    getestadistica3(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute(`select * from(select c.NOMBRE, count(r.Id_Respuesta) as CANTIDAD from respuesta r, ciencia c, tema_ciencia tc, tema t
                        where c.id_ciencia=tc.id_ciencia and tc.id_tema=t.id_tema and r.id_tema=tc.id_tema
                        group by c.Nombre 
                        order by CANTIDAD desc
                        ) where rownum <=3`, {}, { outFormat: oracledb_1.default.OBJECT }, function (err, result) {
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
    getestadistica4general(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute(`select*from(
                            select u.nombre, count(id_tema) as CANTIDAD from usuario u, Tema t, rol_usuario ru  where u.id_usuario=t.id_usuario and ru.id_rol!=2 and ru.id_usuario=u.id_usuario
                            group by u.nombre 
                            order by CANTIDAD desc
                            )where rownum<=5`, {}, { outFormat: oracledb_1.default.OBJECT }, function (err, result) {
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
    getestadistica4(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute(`select * from(
                            select u.nombre, count(t.TITULO) as CANTIDAD from usuario u, tema t, tema_ciencia tc, rol_usuario ru where 
                            tc.id_ciencia=:0 and tc.id_tema=t.id_tema and u.id_usuario = t.id_usuario and ru.id_rol!=2 and ru.id_usuario=u.id_usuario
                            group by u.nombre
                            order by CANTIDAD desc
                            )where rownum<=5`, [Number(req.params.ciencia)], { outFormat: oracledb_1.default.OBJECT }, function (err, result) {
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
    getestadistica5general(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute(`select*from(
                            select u.nombre, count(id_tema) as CANTIDAD from usuario u, Tema t, rol_usuario ru  where u.id_usuario=t.id_usuario and ru.id_rol=2 and ru.id_usuario=u.id_usuario
                            group by u.nombre 
                            order by CANTIDAD desc
                            )where rownum<=5`, {}, { outFormat: oracledb_1.default.OBJECT }, function (err, result) {
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
    getestadistica5(req, res) {
        async.waterfall([
            doconnect,
            function (conn, cb) {
                conn.execute(`select * from(
                            select u.nombre, count(t.TITULO) as CANTIDAD from usuario u, tema t, tema_ciencia tc, rol_usuario ru where 
                            tc.id_ciencia=4 and tc.id_tema=t.id_tema and u.id_usuario = t.id_usuario and ru.id_rol=2 and ru.id_usuario=u.id_usuario
                            group by u.nombre
                            order by CANTIDAD desc
                            )where rownum<=5
                            `, [Number(req.params.ciencia)], { outFormat: oracledb_1.default.OBJECT }, function (err, result) {
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
exports.estadisticaController = new EstadisticaController();
