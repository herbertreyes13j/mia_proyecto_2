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

  class SalaController{

    public getmisexamenes(req:Request, res:Response){
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        "select * from examen where id_catedratico=:0",[req.params.id],{outFormat: oracledb.OBJECT},
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
    public buscarsala(req:Request, res:Response){
        console.log(req.params.sala);
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        "select * from sala where NOMBRE=:0",[req.params.sala],{outFormat: oracledb.ARRAY},
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
      public insertarsala(req:Request, res:Response){
        console.log(req.body);
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `insert into sala(nombre,tiempo,estado,id_examen) values(:0,:1,:2,:3)`,
                        [req.body.NOMBRE,Number(req.body.TIEMPO),Number(req.body.ESTADO),Number(req.body.ID_EXAMEN)],{autoCommit:true},
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
  }

  export const salaController = new SalaController();