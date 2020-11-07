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

class UsuarioCrudController{

    public getusuarioid(req:Request, res:Response){
        async.waterfall(
          [
              doconnect,
              function(conn:any, cb:any){
                  conn.execute(
                      "select id_usuario from usuario where correo=:0",[req.params.correo],{outFormat: oracledb.ARRAY},
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

      public getusuariodiferente(req:Request, res:Response){
        async.waterfall(
          [
              doconnect,
              function(conn:any, cb:any){
                  conn.execute(
                      "select distinct u.id_usuario, u.carnet, u.nombre, u.fotografia, u.correo from usuario u, rol_usuario rs where rs.id_rol!=1 and u.id_usuario=rs.id_usuario and u.id_usuario!=:0",[req.params.id],{outFormat: oracledb.OBJECT},
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


    public insertarusuario(req:Request, res:Response){
        console.log(req.body);
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `insert into usuario(carnet,nombre,fotografia,correo,telefono,clave_acceso) values(:0,:1,:2,:3,:4,:5)`,
                        [Number(req.body.CARNET),req.body.NOMBRE,req.body.FOTOGRAFIA,
                        req.body.CORREO,Number(req.body.TELEFONO),req.body.CLAVE_ACCESO],{autoCommit:true},
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

      public insertarusuariocarrera(req:Request, res:Response){
        console.log(req.body);
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `insert into carrera_usuario(id_carrera,id_usuario) values(:0,:1)`,
                        [Number(req.body.ID_CARRERA),Number(req.body.ID_USUARIO)],{autoCommit:true},
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
      public insertarusuariorol(req:Request, res:Response){
        console.log(req.body);
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `insert into rol_usuario(id_rol,id_usuario)VALUES(:0,:1)`,
                        [Number(req.body.ID_ROL),Number(req.body.ID_USUARIO)],{autoCommit:true},
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

export const usuarioCrudController = new UsuarioCrudController();