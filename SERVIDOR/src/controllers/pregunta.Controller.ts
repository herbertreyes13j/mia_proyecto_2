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

  class PreguntaController{

        
      public insertarpregunta(req:Request, res:Response){
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `insert into pregunta(tipopregunta,pregunta,id_usuario) values(:0,:1,:2)`,
                        [Number(req.body.TIPOPREGUNTA),req.body.PREGUNTA,Number(req.body.ID_USUARIO)],{autoCommit:true},
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

      public insertarrespuesta(req:Request, res:Response){
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `insert into respuesta_examen(valor,escorrecta,id_pregunta) values(:0,:1,:2) `,
                        [req.body.VALOR,Number(req.body.CORRECTA),Number(req.body.ID_PREGUNTA)],{autoCommit:true},
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

      public insertarexamen(req:Request, res:Response){
        console.log(req.body);
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `insert into examen(titulo,id_tema,id_ciencia,fecha,fecha_modificacion,id_catedratico) values(:0,:1,:2,:3,:4,:5)`,
                        [req.body.TITULO,Number(req.body.ID_TEMA),Number(req.body.ID_CIENCIA),
                        new Date(),new Date(),Number(req.body.ID_CATEDRATICO)],{autoCommit:true},
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
      public insertarexamenpregunta(req:Request, res:Response){
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `insert into pregunta_examen(id_pregunta,id_examen) values (:0,:1)`,
                        [Number(req.body.ID_PREGUNTA),Number(req.body.ID_EXAMEN)],{autoCommit:true},
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
      public getlastinsertada(req:Request, res:Response){
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        "select max(id_pregunta) as id_pregunta from pregunta",{},{outFormat: oracledb.ARRAY},
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

    public getlastexamen(req:Request, res:Response){
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        "select max(id_examen) as id_examen from examen",{},{outFormat: oracledb.ARRAY},
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

    public getpreguntasusuario(req:Request, res:Response){
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        "select * from pregunta where id_usuario=:0 order by id_pregunta",[req.params.id],{outFormat: oracledb.OBJECT},
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

  export const preguntaController = new PreguntaController();