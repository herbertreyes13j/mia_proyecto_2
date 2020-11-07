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

  class TemaCrudController{
    public gettemas(req:Request, res:Response){
      async.waterfall(
        [
            doconnect,
            function(conn:any, cb:any){
                conn.execute(
                    "select  u.nombre, u.id_usuario,t.id_tema, t.titulo, t.descripcion, t.fecha_creacion, t.no_resp, t.solucionado from usuario u, tema t where t.id_usuario=u.id_usuario",{},{outFormat: oracledb.OBJECT},
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
    public gettemaid(req:Request, res:Response){
      console.log(req.params.id);
      console.log('funciona');
      console.log('hace el id');
      async.waterfall(
        [
            doconnect,
            function(conn:any, cb:any){
                conn.execute(
                    "select id_tema from tema where id_usuario=:0 and titulo=:1",
                    [Number(req.params.id),req.params.titulo],{outFormat: oracledb.ARRAY},
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

    public get1temaid(req:Request, res:Response){
      console.log(req.params.id);
      console.log('funciona');
      async.waterfall(
        [
            doconnect,
            function(conn:any, cb:any){
                conn.execute(
                    "select * from tema where id_tema=:0",
                    [Number(req.params.id)],{outFormat: oracledb.ARRAY},
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
      console.log(req.params.idtema);
      console.log('funciona');
      console.log('es esta');
      async.waterfall(
        [
            doconnect,
            function(conn:any, cb:any){
                conn.execute(
                    "select r.id_respuesta, r.respuesta, r.id_tema,r.fecha, u.nombre, u.fotografia from respuesta r, usuario u where r.id_tema=:0 and u.id_usuario=r.id_usuario order by r.id_respuesta",
                    [Number(req.params.idtema)],{outFormat: oracledb.OBJECT},
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
    public insertartema(req:Request, res:Response){
       
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `insert into tema(titulo,descripcion,fecha_creacion,no_resp,solucionado,id_usuario) values(:0,:1,:2,:3,:4,:5)`,
                        [req.body.TITULO,req.body.DESCRIPCION,new Date(),
                        0,0,Number(req.body.ID_USUARIO)],{autoCommit:true},
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

      public insertartemaciencia(req:Request, res:Response){
       
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `insert into tema_ciencia(id_tema,id_ciencia) values (:0,:1)`,
                        [Number(req.body.ID_TEMA),Number(req.body.ID_CIENCIA)],{autoCommit:true},
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
      public insertartemafacultad(req:Request, res:Response){
       
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `insert into tema_facultad(id_tema,id_facultad) values (:0,:1)`,
                        [Number(req.body.ID_TEMA),Number(req.body.ID_FACULTAD)],{autoCommit:true},
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

      public insertarrespuesta(req:Request, res:Response){
       
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `insert into respuesta(id_usuario,id_tema,respuesta,fecha) values (:0,:1,:2,:3)`,
                        [Number(req.body.ID_USUARIO),Number(req.body.ID_TEMA),req.body.RESPUESTA,new Date()],{autoCommit:true},
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
      public insertartemacarrera(req:Request, res:Response){
       
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `insert into tema_carrera(id_tema,id_carrera) values (:0,:1)`,
                        [Number(req.body.ID_TEMA),Number(req.body.ID_CARRERA)],{autoCommit:true},
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

      public updatetema(req:Request, res:Response){
       
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `update tema set no_resp=no_resp+1 where id_tema=:0`,
                        [Number(req.params.id)],{autoCommit:true},
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

  export const temaCrudController= new TemaCrudController();