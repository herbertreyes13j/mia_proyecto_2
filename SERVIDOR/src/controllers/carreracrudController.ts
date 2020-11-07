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

  class CarreraCrudController{
    public getcarreras(req:Request, res:Response){
      async.waterfall(
        [
            doconnect,
            function(conn:any, cb:any){
                conn.execute(
                    "select *from carrera",{},{outFormat: oracledb.OBJECT},
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
    public getcarreraid(req:Request, res:Response){
      console.log(req.params.id);
      console.log('funciona');
      async.waterfall(
        [
            doconnect,
            function(conn:any, cb:any){
                conn.execute(
                    "select *from carrera where id_facultad=:0",[Number(req.params.id)],{outFormat: oracledb.OBJECT},
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
    public insertarcarrera(req:Request, res:Response){
       
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `insert into carrera(id_facultad,nombre) values(:0,:1)`,
                        [Number(req.body.ID_FACULTAD),req.body.NOMBRE],{autoCommit:true},
                        function(err:any, result:any){
                            if(err){
                                return cb(err, conn);     
                            }else{
                              
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

  export const carreraCrudController= new CarreraCrudController();