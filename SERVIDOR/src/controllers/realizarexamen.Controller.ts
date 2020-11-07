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

  class RealizarExamenController{

    public getpreguntas(req:Request, res:Response){
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        "select p.ID_PREGUNTA, p.TIPOPREGUNTA, p.PREGUNTA from pregunta_examen pe, pregunta p where id_examen=:0 and pe.ID_PREGUNTA = p.ID_PREGUNTA"
                        ,[req.params.idexamen],{outFormat: oracledb.OBJECT},
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

    public getrespuestas(req:Request, res:Response){
        console.log(req.params.idpregunta);
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        "select * from respuesta_examen where id_pregunta=:0"
                        ,[req.params.idpregunta],{outFormat: oracledb.OBJECT},
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

    public getsalas(req:Request, res:Response){
        console.log(req.params.idpregunta);
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        "select s.id_sala, s.nombre from sala s, examen e where e.id_catedratico=:0 and e.id_examen = s.id_examen"
                        ,[Number(req.params.idusuario)],{outFormat: oracledb.OBJECT},
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

    public getnotas(req:Request, res:Response){
        console.log(req.params.idpregunta);
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        "select u.carnet as CARNET, u.nombre AS NOMBRE, es.NOTA as NOTA, s.NOMBRE as SALA  from estudiante_sala es, usuario u, sala s where u.id_usuario = es.id_estudiante and s.nombre=:0 and es.id_sala = s.id_sala"
                        ,[req.params.sala],{outFormat: oracledb.OBJECT},
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

      public insertarestudiantesala(req:Request, res:Response){
        console.log(req.body);
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `insert into estudiante_sala(id_sala,id_estudiante,nota) values(:0,:1,:2)`,
                        [Number(req.body.ID_SALA),Number(req.body.ID_ESTUDIANTE),0],{autoCommit:true},
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

      public actualizarnota(req:Request, res:Response){
        console.log(req.body);
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `update estudiante_sala set NOTA=:0 where id_sala=:1 and id_estudiante=:2`,
                        [Number(req.body.NOTA),Number(req.body.ID_SALA),Number(req.body.ID_ESTUDIANTE)],{autoCommit:true},
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

  export const realizarexamenController = new RealizarExamenController();