import {Request, Response} from 'express';
import dbconfig from '../DB/dbconfig';
import oracledb from 'oracledb';

var async =require('async');

var doconnect =function(cb:any) {
    oracledb.getConnection(dbconfig,cb);
    console.log('Conexion exitosa');
};

var resp:string[];
var dorelease = function(conn:any) {
    conn.close(function (err:any) {
      if (err)
        console.error(err.message);
    });
  };

  class EstadisticaController{

    public getestadistica1(req:Request, res:Response){
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `select * from (select u.Nombre,u.fotografia, count(r.Id_Respuesta) as CANTIDAD from respuesta r, usuario u, tema_ciencia tc, tema t, rol_usuario ru
                        where tc.id_ciencia=:0 and tc.id_tema=t.id_tema and r.id_tema=tc.id_tema and u.id_usuario=r.id_usuario and ru.id_rol=2 and ru.id_usuario=u.id_usuario
                        group by u.Nombre,u.fotografia
                        order by CANTIDAD desc
                        )where rownum <=3`,[Number(req.params.ciencia)],{outFormat: oracledb.OBJECT},
                        function(err:any, result:any){
                            if(err){
                                return cb(err,conn);
                            }else{
                                res.send(result.rows);
                            }
                        });
                }],
                function (err:any, conn:any) {
                    if (err) { console.error("In waterfall error cb: ==>", err, "<=="); 
                      res.send('ERROR');}
                    if (conn){
                      dorelease(conn);
                    }
                }             
        );
    }

    public getestadistica2(req:Request, res:Response){
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `select * from (select u.Nombre,u.fotografia, count(r.Id_Respuesta) as CANTIDAD from respuesta r, usuario u, tema_ciencia tc, tema t, rol_usuario ru
                        where tc.id_ciencia=:0 and tc.id_tema=t.id_tema and r.id_tema=tc.id_tema and u.id_usuario=r.id_usuario and ru.id_rol!=2 and ru.id_usuario=u.id_usuario
                        group by u.Nombre,u.fotografia 
                        order by CANTIDAD desc
                        )where rownum <=10`,[Number(req.params.ciencia)],{outFormat: oracledb.OBJECT},
                        function(err:any, result:any){
                            if(err){
                                return cb(err,conn);
                            }else{
                                res.send(result.rows);
                            }
                        });
                }],
                function (err:any, conn:any) {
                    if (err) { console.error("In waterfall error cb: ==>", err, "<=="); 
                      res.send('ERROR');}
                    if (conn){
                      dorelease(conn);
                    }
                }             
        );
    }

    public getestadistica3(req:Request, res:Response){
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `select * from(select c.NOMBRE, count(r.Id_Respuesta) as CANTIDAD from respuesta r, ciencia c, tema_ciencia tc, tema t
                        where c.id_ciencia=tc.id_ciencia and tc.id_tema=t.id_tema and r.id_tema=tc.id_tema
                        group by c.Nombre 
                        order by CANTIDAD desc
                        ) where rownum <=3`,{},{outFormat: oracledb.OBJECT},
                        function(err:any, result:any){
                            if(err){
                                return cb(err,conn);
                            }else{
                                res.send(result.rows);
                            }
                        });
                }],
                function (err:any, conn:any) {
                    if (err) { console.error("In waterfall error cb: ==>", err, "<=="); 
                      res.send('ERROR');}
                    if (conn){
                      dorelease(conn);
                    }
                }             
        );
    }
    public getestadistica4general(req:Request, res:Response){
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `select*from(
                            select u.nombre, count(id_tema) as CANTIDAD from usuario u, Tema t, rol_usuario ru  where u.id_usuario=t.id_usuario and ru.id_rol!=2 and ru.id_usuario=u.id_usuario
                            group by u.nombre 
                            order by CANTIDAD desc
                            )where rownum<=5`,{},{outFormat: oracledb.OBJECT},
                        function(err:any, result:any){
                            if(err){
                                return cb(err,conn);
                            }else{
                                res.send(result.rows);
                            }
                        });
                }],
                function (err:any, conn:any) {
                    if (err) { console.error("In waterfall error cb: ==>", err, "<=="); 
                      res.send('ERROR');}
                    if (conn){
                      dorelease(conn);
                    }
                }             
        );
    }
    public getestadistica4(req:Request, res:Response){
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `select * from(
                            select u.nombre, count(t.TITULO) as CANTIDAD from usuario u, tema t, tema_ciencia tc, rol_usuario ru where 
                            tc.id_ciencia=:0 and tc.id_tema=t.id_tema and u.id_usuario = t.id_usuario and ru.id_rol!=2 and ru.id_usuario=u.id_usuario
                            group by u.nombre
                            order by CANTIDAD desc
                            )where rownum<=5`,[Number(req.params.ciencia)],{outFormat: oracledb.OBJECT},
                        function(err:any, result:any){
                            if(err){
                                return cb(err,conn);
                            }else{
                                res.send(result.rows);
                            }
                        });
                }],
                function (err:any, conn:any) {
                    if (err) { console.error("In waterfall error cb: ==>", err, "<=="); 
                      res.send('ERROR');}
                    if (conn){
                      dorelease(conn);
                    }
                }             
        );
    }
    public getestadistica5general(req:Request, res:Response){
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `select*from(
                            select u.nombre, count(id_tema) as CANTIDAD from usuario u, Tema t, rol_usuario ru  where u.id_usuario=t.id_usuario and ru.id_rol=2 and ru.id_usuario=u.id_usuario
                            group by u.nombre 
                            order by CANTIDAD desc
                            )where rownum<=5`,{},{outFormat: oracledb.OBJECT},
                        function(err:any, result:any){
                            if(err){
                                return cb(err,conn);
                            }else{
                                res.send(result.rows);
                            }
                        });
                }],
                function (err:any, conn:any) {
                    if (err) { console.error("In waterfall error cb: ==>", err, "<=="); 
                      res.send('ERROR');}
                    if (conn){
                      dorelease(conn);
                    }
                }             
        );
    }
    public getestadistica5(req:Request, res:Response){
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `select * from(
                            select u.nombre, count(t.TITULO) as CANTIDAD from usuario u, tema t, tema_ciencia tc, rol_usuario ru where 
                            tc.id_ciencia=4 and tc.id_tema=t.id_tema and u.id_usuario = t.id_usuario and ru.id_rol=2 and ru.id_usuario=u.id_usuario
                            group by u.nombre
                            order by CANTIDAD desc
                            )where rownum<=5
                            `,[Number(req.params.ciencia)],{outFormat: oracledb.OBJECT},
                        function(err:any, result:any){
                            if(err){
                                return cb(err,conn);
                            }else{
                                res.send(result.rows);
                            }
                        });
                }],
                function (err:any, conn:any) {
                    if (err) { console.error("In waterfall error cb: ==>", err, "<=="); 
                      res.send('ERROR');}
                    if (conn){
                      dorelease(conn);
                    }
                }             
        );
    }


   
  }

  export const estadisticaController = new EstadisticaController();