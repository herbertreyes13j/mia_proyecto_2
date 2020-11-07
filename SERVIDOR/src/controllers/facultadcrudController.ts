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

  class FacultadCrudController{

        
      public insertarfacultad(req:Request, res:Response){
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `insert into facultad(nombre) values (:0)`,
                        [req.body.FACULTAD],{autoCommit:true},
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

      public getfacultades(req:Request, res:Response){
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        "select * from facultad",{},{outFormat: oracledb.OBJECT},
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

  export const facultadCrudController = new FacultadCrudController();