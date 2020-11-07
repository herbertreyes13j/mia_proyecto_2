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

  class CienciaCrudController{

        
      public insertarciencia(req:Request, res:Response){
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `insert into ciencia(nombre,descripcion,id_carrera) values (:0,:1,:2)`,
                        [req.body.CIENCIA,req.body.DESCRIPCION, Number(req.body.ID_CARRERA)],{autoCommit:true},
                        function(err:any, result:any){
                            if(err){
                                return cb(err, conn);     
                            }else{
                                console.log(result);
                               res.send(result.rowsaffected);
                            }
                        }
                    );
                }
            ],
            function(err:any,conn:any){
                if (err) { console.error("In waterfall error cb: ==>", err, "<=="); 
                res.send('ERROR');}
              if (conn){
                dorelease(conn);
              }
            }
        );
      }

      public getfaciencias(req:Request, res:Response){
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        "select c.nombre as CIENCIA, c.descripcion, ca.nombre as CARRERA, f.nombre as FACULTAD from ciencia c, carrera ca, facultad f where c.id_carrera = ca.id_carrera and ca.id_facultad= f.id_facultad",{},{outFormat: oracledb.OBJECT},
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

    public getciencias(req:Request, res:Response){
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        "select c.id_ciencia as ID_CIENCIA, c.nombre as CIENCIA, c.descripcion, ca.nombre as CARRERA, f.nombre as FACULTAD from ciencia c, carrera ca, facultad f where c.id_carrera = ca.id_carrera and ca.id_facultad= f.id_facultad",{},{outFormat: oracledb.OBJECT},
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

    public gettodasciencias(req:Request, res:Response){
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        "select * from ciencia",{},{outFormat: oracledb.OBJECT},
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

  export const cienciaCrudController = new CienciaCrudController();