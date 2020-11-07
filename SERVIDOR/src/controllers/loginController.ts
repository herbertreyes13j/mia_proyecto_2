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

 class LoginController{

    public gettiposusuarios(req:Request, res:Response){
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        "select * from rol",{},{outFormat: oracledb.OBJECT},
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

    public async insertar(req:Request, res:Response):Promise<void>{
        console.log(req.body);
        let idusuario:number;
        async.waterfall(
            [
                doconnect,
                function(conn:any, cb:any){
                    conn.execute(
                        `select * from usuario where id_usuario=(select id_usuario from rol_usuario where id_rol=:0 and id_usuario=(select id_usuario from usuario where correo=:1 and clave_acceso=:2))`,
                        [Number(req.body.TIPO_USUARIO),req.body.CORREO,req.body.PASSWORD],{outFormat:oracledb.ARRAY},
                        function(err:any, result:any){
                            if(err){
                                console.log(req.body.CORREO);
                                console.log(err);
                                return cb(err,conn);      
                            }else{
                                if(result.rows.length==1){
                                    console.log(result.rows);
                                    res.send(result.rows);
                                }else{
                                    res.send('USUARIO NO EXISTE');
                                }
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

 export const loginController = new LoginController();