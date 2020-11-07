import {Request, Response} from 'express';
import dbconfig from '../DB/dbconfig';
import oracledb, { NUMBER } from 'oracledb';
import { AnyARecord } from 'dns';
import { setTimeout } from 'timers';

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

  class ConversacionController{
   getidconversacion(req:Request, res:Response){
    async.waterfall(
      [
          doconnect,
          function(conn:any, cb:any){
              conn.execute(
                  "select id_conversacion from conversacion where (id_user1=:0 or id_user1=:1) and (id_user2=:0 or id_user2=:1)",
                  [Number(req.params.id1),Number(req.params.id2)],{outFormat: oracledb.OBJECT},
                  function(err:any, result:any){
                      if(err){
                        return cb(err,conn);
                      }else{
                          res.send(result.rows);
                      }
                  });
          }]
          ,
          function (err:any, conn:any) {
              if (err) { console.error("In waterfall error cb: ==>", err, "<=="); 
                res.send('ERROR');}
              if (conn){
                dorelease(conn);
              }
          }             
  );

}
    public getmensajes(req:Request, res:Response){
      console.log(req.params.id);

      async.waterfall(
        [
            doconnect,
            async function(conn:any, cb:any){
                conn.execute(
                    "select * from mensaje where id_conversacion=:0 order by id_mensaje",[Number(req.params.id)],{outFormat: oracledb.OBJECT},
                    function(err:any, result:any){
                        if(err){
                          return cb(err,conn);
                        }else{
                            res.send(result.rows);
                        }
                    });
            }]
            ,
            function (err:any, conn:any) {
                if (err) { console.error("In waterfall error cb: ==>", err, "<=="); 
                  res.send('ERROR');}
                if (conn){
                  dorelease(conn);
                }
            }             
    );
    }
    
    public insertarconversacion(req:Request, res:Response){
        async.waterfall(
            [
                doconnect,
                 function(conn:any, cb:any){
                    conn.execute(
                        `insert into conversacion(id_user1,id_user2,estado) values(:0,:1,1)`,
                        [Number(req.body.ID1),Number(req.body.ID2)],{autoCommit:true},
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

  export const conversacionController= new ConversacionController();