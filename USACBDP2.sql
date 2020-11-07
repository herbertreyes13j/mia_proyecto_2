    x   ava-- CREANDO TABLA FACULTAD 

CREATE TABLE Facultad(
id_facultad INT primary key,
nombre VARCHAR2(30),
descripcion VARCHAR2(50)
);

CREATE SEQUENCE id_facultad_seq START WITH 1;

CREATE TRIGGER facultad_bi
BEFORE INSERT ON Facultad
FOR EACH ROW 
BEGIN 
SELECT ID_FACULTAD_SEQ.nextval
INTO :new.id_facultad
FROM dual;
END;

-- CREANDO TABLA CARRERA

CREATE TABLE Carrera(
id_carrera int primary key,
id_facultad int,
nombre varchar2(40),
descripcion varchar2(60),
foreign key(id_facultad)
references Facultad(id_facultad)
);

create sequence id_carrera_seq START WITH 1;

create trigger carrera_bi
before insert on Carrera
for each row
begin
select ID_CARRERA_SEQ.nextval
INTO :new.id_carrera
from dual;
end;

-- CREANDO TABLA ROL
create table rol(
id_rol int primary key,
rol varchar2(30),
descripcion varchar2(50)
);

create sequence id_rol_seq START WITH 1;

create trigger rol_bi
before insert on rol
for each row
begin
select ID_ROL_SEQ.nextval
INTO :new.id_rol
from dual;
end;

--CREANDO TABLA USUARIO
create table usuario(
id_usuario int primary key,
carnet int,
nombre varchar2(60),
fotografia varchar2(50),
correo varchar2(50),
telefono int,
clave_acceso varchar2(50),
tipo_usuario int
);

insert into usuario(carnet,nombre,fotografia,correo,telefono,clave_acceso) values(201610673,'Emely Monge','../../src/assets/Images/usuarios/user1.jpg','emely@gmail.com',45859647,'admin1234');

insert into rol_usuario(id_rol,id_usuario)VALUES(1,1);

commit

select * from usuario where id_usuario=(select id_usuario from rol_usuario where id_rol=1 and id_usuario=(select id_usuario from usuario where correo='emely@gmail.com' and clave_acceso='admin1234'));

select *from rol_usuario where id_usuario=1 and id_rol=1;

create sequence id_usuario_seq START WITH 1;

create trigger usuario_bi
before insert on usuario
for each row
begin
select ID_USUARIO_SEQ.nextval
INTO :new.id_usuario
from dual;
end;

-- CREANDO ROL_USUARIO

create table rol_usuario(
id_rol int,
id_usuario int,
primary key (id_rol,id_usuario),
foreign key(id_rol)
references rol(id_rol), 
foreign key(id_usuario)
references usuario(id_usuario)
);

-- CREANDO FACULTAD USUARIO

create table facultad_usuario(
id_usuario int,
id_facultad int,
primary key(id_usuario, id_facultad),
foreign key(id_usuario)
references usuario(id_usuario),
foreign key(id_facultad)REFERENCES facultad(id_facultad)
);

--CREANDO TABLA CARRERA USUARIO

create table carrera_usuario(
id_carrera int,
id_usuario int,
primary key(id_carrera,id_usuario),
nombre varchar2(40),
descripcion varchar2(60),
foreign key(id_usuario)
references usuario(id_usuario),
foreign key(id_carrera)
references carrera(id_carrera)
);

-- CREATE TABLE CIENCIA

create table ciencia(
id_ciencia int primary key,
nombre varchar2(60),
descripcion varchar2(80)
);

create sequence id_ciencia_seq START WITH 1;

create trigger ciencia_bi
before insert on ciencia
for each row
begin
select ID_CIENCIA_SEQ.nextval
INTO :new.id_ciencia
from dual;
end;

--CREANDO TABLA DE TEMAS
create table tema(
id_tema int primary key,
titulo varchar2(40),
descripcion varchar2(70),
fecha_creacion date,
no_resp int,
solucionado int
);

create sequence id_tema_seq START WITH 1;

create trigger tema_bi
before insert on tema
for each row
begin
select ID_TEMA_SEQ.nextval
INTO :new.id_tema
from dual;
end;

-- CREANDO TABLA IMAGEN
create table imagen(
id_imagen int primary key,
id_tema int,
ruta varchar2(50),
foreign key(id_tema)
references tema(id_tema)
);

create sequence id_imagen_seq START WITH 1;

create trigger imagen_bi
before insert on imagen
for each row
begin
select ID_IMAGEN_SEQ.nextval
INTO :new.id_imagen
from dual;
end;

-- TEMA CIENCIA
create table tema_ciencia(
id_tema int,
id_ciencia int,
primary key(id_ciencia, id_tema),
foreign key(id_ciencia)
references ciencia(id_ciencia),
foreign key(id_tema) 
references tema(id_tema)
);

--TEMA USUARIOS
create table tema_usuarios(
id_tema int,
id_usuario int,
primary key(id_tema, id_usuario),
foreign key(id_tema)
references tema(id_tema),
foreign key(id_usuario)
references usuario(id_usuario)
);

--TABLA RESPUESTA

create table respuesta(
id_respuesta int primary key,
id_usuario int,
id_tema int,
respuesta varchar2(100),
foreign key(id_tema)
references tema(id_tema),
foreign key(id_usuario)
references usuario(id_usuario)
);

create sequence id_respuesta_seq START WITH 1;

create trigger respuesta_bi
before insert on respuesta
for each row
begin
select ID_RESPUESTA_SEQ.nextval
INTO :new.id_respuesta
from dual;
end;

-- TEMA CLAUSUARADO
create table tema_clausurado(
id_tema int,
id_usuario int,
razon varchar(100),
fecha date,
primary key(id_tema, id_usuario),
foreign key(id_tema)
references tema(id_tema),
foreign key(id_usuario)
references usuario(id_usuario)
);

-- TABLA RESPUESTA
create table respuesta_examen(
id_respuesta_examen int primary key,
valor varchar2(60),
escorrecta int
);

create sequence id_respuesta_examen_seq START WITH 1;

create trigger respuesta_examen_bi
before insert on respuesta_examen
for each row
begin
select ID_RESPUESTA_EXAMEN_SEQ.nextval
INTO :new.id_respuesta_examen
from dual;
end;

--TABLA PREGUNTA
create table pregunta(
id_pregunta int primary key,
tipopregunta int,
pregunta varchar2(100)
);

create sequence id_pregunta_seq START WITH 1;

create trigger pregunta_bi
before insert on pregunta
for each row
begin
select ID_PREGUNTA_SEQ.nextval
INTO :new.id_pregunta
from dual;
end;

-- TABLA PREGUNTA RESPUESTA
create table pregunta_respuesta(
id_pregunta int,
id_respuesta_examen int,
primary key(id_respuesta_examen, id_pregunta),
foreign key(id_respuesta_examen)
references respuesta_examen(id_respuesta_examen),
foreign key(id_pregunta)
references pregunta(id_pregunta)
);

--TABLA EXAMEN
create table examen(
id_examen int primary key,
titulo varchar2(40),
id_tema int,
id_ciencia int,
fecha date,
fecha_modificacion date,
id_catedratico int,
foreign key(id_tema)
references tema(id_tema),
foreign key(id_ciencia)
references ciencia(id_ciencia),
foreign key(id_catedratico)
references usuario(id_usuario)
);

create sequence id_examen_seq START WITH 1;

create trigger examen_bi
before insert on examen
for each row
begin
select ID_EXAMEN_SEQ.nextval
INTO :new.id_examen
from dual;
end;

--tabla pregunta examen
create table pregunta_examen(
id_pregunta int,
id_examen int,
primary key(id_pregunta, id_examen),
foreign key(id_pregunta)
references pregunta(id_pregunta),
foreign key(id_examen)
references examen(id_examen)
);

-- TABLA SALA

create table sala(
id_sala int primary key,
nombre varchar2(50),
tiempo int,
estado int,
id_examen int,
foreign key(id_examen)
references examen(id_examen)
);

create sequence id_sala_seq START WITH 1;

create trigger sala_bi
before insert on sala
for each row
begin
select ID_SALA_SEQ.nextval
INTO :new.id_sala
from dual;
end;

--ESTUDIANTE SALA

create table estudiante_sala(
id_sala int,
id_estudiante int,
primary key(id_sala, id_estudiante),
foreign key(id_sala)
references sala(id_sala),
foreign key(id_estudiante)
references usuario(id_usuario)
);

--CONVERSACION
create table conversacion(
id_conversacion int primary key,
id_user1 int,
id_user2 int,
estado int,
foreign key(id_user1)
references usuario(id_usuario),
foreign key(id_user2)
references usuario(id_usuario)
);

create sequence id_conversacion_seq START WITH 1;

create trigger conversacion_bi
before insert on conversacion
for each row
begin
select ID_CONVERSACION_SEQ.nextval
INTO :new.id_conversacion
from dual;
end;

--TABLA MENSAJE

create table mensaje(
id_mensaje int primary key,
hora date,
emisor int,
id_conversacion int,
foreign key (emisor)
references usuario(id_usuario),
foreign key(id_conversacion)
references conversacion(id_conversacion)
);

create sequence id_mensaje_seq START WITH 1;

create trigger mensaje_bi
before insert on mensaje
for each row
begin
select ID_MENSAJE_SEQ.nextval
INTO :new.id_mensaje
from dual;
end;

insert into rol(rol,descripcion) values ('Administrador');
insert into rol(rol,descripcion) values ('Catedratico');
insert into rol(rol,descripcion) values ('Auxiliar');
insert into rol(rol,descripcion) values ('Estudiante');
insert into rol(rol,descripcion) values ('Trabajador');
insert into rol(rol,descripcion) values ('Junta Directiva');

ALTER TABLE sala
ADD CONSTRAINT sala_unique UNIQUE(nombre)

ALTER TABLE rol
ADD CONSTRAINT rol_unique UNIQUE (rol);

ALTER TABLE facultad
ADD CONSTRAINT facultad_unique UNIQUE (nombre);

ALTER TABLE carrera
ADD CONSTRAINT carrera_unique UNIQUE (nombre,id_facultad);

ALTER TABLE usuario
ADD CONSTRAINT usuario2_unique UNIQUE (carnet,correo);

commit;

select * from rol;

insert into rol(rol) values('Auxiliar');

delete from rol where id_rol=31;


insert into facultad(nombre) values ('Ingenieria');

select * from facultad;

commit

insert into carrera(id_facultad,nombre) values(1,'Ingenieria Mecanica');

select * from carrera;


alter table ciencia
add constraint fk_ciencia
foreign key(id_carrera) references carrera

alter table tema
add constraint fk_usuario
foreign key(id_usuario) references usuario

select * from carrera

select *from carrera where id_facultad=1;

select * from ciencia
insert into ciencia(nombre,descripcion,id_carrera) values ('Manejo e Implementacion de Archivos','Curso sobre sistemas de archivos y bases de datos',1)

select c.id_ciencia as ID_CIENCIA, c.nombre as CIENCIA, c.descripcion, ca.nombre as CARRERA, f.nombre as FACULTAD from ciencia c, carrera ca, facultad f where c.id_carrera = ca.id_carrera and ca.id_facultad= f.id_facultad

select * from usuario

select * from rol_usuario where id_usuario=2

select * from rol

select * from tema

update usuario set FOTOGRAFIA='assets/Images/usuarios/user4.jpg' where id_usuario=4

update usuario set FOTOGRAFIA='assets/Images/usuarios/user5.jpg' where id_usuario=5

insert into tema(titulo,descripcion,fecha_creacion,no_resp,solucionado,id_usuario) values('Bases de Datos','Tema sobre lo que compone a una base de datos',CURRENT_DATE,0,0,2);
insert into tema(titulo,descripcion,fecha_creacion,no_resp,solucionado,id_usuario) values('Estructuras de Datos','Las diversas estructuras de datos que se pueden generar en memoria dinamica',CURRENT_DATE,0,0,2);
insert into tema(titulo,descripcion,fecha_creacion,no_resp,solucionado,id_usuario) values('Fundamentos de Electronica','Tema sobre lo basico en la electronica',CURRENT_DATE,0,0,2);
insert into tema(titulo,descripcion,fecha_creacion,no_resp,solucionado,id_usuario) values('Electricidad','La evolucion de la electricidad',CURRENT_DATE,0,0,2);
insert into tema(titulo,descripcion,fecha_creacion,no_resp,solucionado,id_usuario) values('La industria','El desarrollo que ha tenido la industria',CURRENT_DATE,0,0,2);

select u.nombre, u.id_usuario,t.id_tema, t.titulo, t.descripcion, t.fecha_creacion, t.no_resp, t.solucionado from usuario u, tema t where t.id_usuario=u.id_usuario

select * from tema

select * from usuario

select * from tema_ciencia

select * from facultad_usuario


insert into conversacion(id_user1,id_user2,estado) values(2,3,1)

select * from conversacion

select * from mensaje

insert into mensaje(hora,emisor,id_conversacion,mensaje)values(CURRENT_DATE,2,1,'Que tal?')

select * from mensaje where id_conversacion=1 order by id_mensaje

select * from conversacion

select id_conversacion from conversacion where (id_user1=2 or id_user1=2) and (id_user2=2 or id_user2=3)

select distinct u.id_usuario, u.carnet, u.nombre, u.fotografia, u.correo from usuario u, rol_usuario rs where rs.id_rol!=1 and u.id_usuario=rs.id_usuario and u.id_usuario!=2

select * from rol_usuario

select * from carrera_usuario

select * from rol

insert into rol_usuario(id_usuario,id_rol) values(5,4)

select * from carrera

insert into carrera_usuario(id_usuario,id_carrera) values(5,7)

select * from tema

drop table tema_usuarios



create table tema_facultad(
id_tema int,
id_facultad int,
primary key(id_facultad, id_tema),
foreign key(id_facultad)
references facultad(id_facultad),
foreign key(id_tema) 
references tema(id_tema)
);

create table tema_carrera(
id_tema int,
id_carrera int,
primary key(id_carrera, id_tema),
foreign key(id_carrera)
references carrera(id_carrera),
foreign key(id_tema) 
references tema(id_tema)
);

commit

insert into tema_facultad(id_tema,id_facultad) values (1,1);

insert into tema_carrera(id_tema,id_carrera) values (1,1);

insert into tema_ciencia(id_tema,id_ciencia) values (1,1);


select id_tema from tema where id_usuario=2 and titulo='Bases de Datos'


select * from tema_facultad

select * from tema_carrera

select * from tema_ciencia

select * from ciencia

select * from ciencia

select c.id_ciencia as ID_CIENCIA, c.nombre as CIENCIA, c.descripcion, ca.nombre as CARRERA, f.nombre as FACULTAD from ciencia c, carrera ca, facultad f where c.id_carrera = ca.id_carrera and ca.id_facultad= f.id_facultad

select * from tema where id_tema=1

insert into respuesta(id_usuario,id_tema,respuesta,fecha) values (2,6,'Segunda Respuesta','')

select * from respuesta

select r.id_respuesta, r.respuesta, r.id_tema,r.fecha, u.nombre from respuesta r, usuario u where r.id_tema=6 and u.id_usuario=r.id_usuario

select r.id_respuesta, r.respuesta, r.id_tema,r.fecha, u.nombre, u.fotografia from respuesta r, usuario u where r.id_tema=6 and u.id_usuario=r.id_usuario order by r.id_respuesta

select * from respuesta

select * from tema

update tema set no_resp=no_resp+1 where id_tema=1

select * from pregunta

drop table pregunta_respuesta

alter table respuesta_examen
add constraint fk_respuesta_pregunta
foreign key(id_pregunta) references pregunta

select * from pregunta

alter table pregunta
add constraint fk_usuariopregunta
foreign key(id_usuario) references usuario


select * from pregunta

insert into pregunta(tipopregunta,pregunta,id_usuario) values(1,'Primera Pregunta',2)

select * from respuesta_examen

insert into respuesta_examen(valor,escorrecta,id_pregunta) values('dfda',1,1) 

select max(id_pregunta) as id_pregunta from pregunta

select * from pregunta where id_usuario=2 order by id_pregunta

select * from respuesta_examen

truncate table respuesta_examen

truncate table pregunta

DELETE FROM pregunta WHERE id_pregunta =1 


select * from examen

insert into examen(titulo,id_tema,id_ciencia,fecha,fecha_modificacion,id_catedratico) values('',1,1,'','',1)

select * from pregunta_examen

insert into pregunta_examen(id_pregunta,id_examen) values (1,1)

select max(id_examen) as id_examen from examen


select * from sala

select * from pregunta
select * from pregunta_examen

select p.ID_PREGUNTA, p.TIPOPREGUNTA, p.PREGUNTA from pregunta_examen pe, pregunta p where id_examen=3 and pe.ID_PREGUNTA = p.ID_PREGUNTA

select * from examen where id_catedratico=2

insert into sala(nombre,tiempo,estado,id_examen) values('',3,1,1)

select * from sala where NOMBRE='ROOM1'

select * from estudiante_sala

select * from respuesta_examen where id_pregunta=12

SELECT u.nombre AS Catedratico, COUNT(t.id_tema) AS TEMAS
FROM ROL rol
INNER JOIN ROL_USUARIO ru ON rol.id_rol == ru.id_rol
INNER JOIN USUARIO u ON u.id_usuario == ru.id_usuario
INNER JOIN TEMA t ON t.id_usuario == u.id_usuario
INNER JOIN CIENCIA c
WHERE rol == 1 and c == 'La zienzia baibi'
ORDER BY TEMAS DESC
LIMIT 5;

select s.id_sala, s.nombre from sala s, examen e where e.id_catedratico=2 and e.id_examen = s.id_examen

select * from examen

select * from estudiante_sala

insert into estudiante_sala(id_sala,id_estudiante,nota) values(1,1,0)

update estudiante_sala set NOTA=100 where id_sala=1 and id_estudiante=1

select * from rol

select u.carnet as CARNET, u.nombre AS NOMBRE, es.NOTA as NOTA, s.NOMBRE as SALA  from estudiante_sala es, usuario u, sala s where u.id_usuario = es.id_estudiante and s.nombre='ROOM4' and es.id_sala = s.id_sala


select u.Nombre, count(r.Id_Respuesta) from respuesta r, usuario u where u.id_usuario=r.id_usuario group by u.Nombre

select * from usuario

select * from rol_usuario

select * from respuesta

select * from (select u.Nombre,u.fotografia, count(r.Id_Respuesta) as CANTIDAD from respuesta r, usuario u, tema_ciencia tc, tema t, rol_usuario ru
where tc.id_ciencia=1 and tc.id_tema=t.id_tema and r.id_tema=tc.id_tema and u.id_usuario=r.id_usuario and ru.id_rol=2 and ru.id_usuario=u.id_usuario
group by u.Nombre,u.fotografia
order by CANTIDAD desc
)where rownum <=3

select * from (select u.Nombre,u.fotografia, count(r.Id_Respuesta) as CANTIDAD from respuesta r, usuario u, tema_ciencia tc, tema t, rol_usuario ru
where tc.id_ciencia=2 and tc.id_tema=t.id_tema and r.id_tema=tc.id_tema and u.id_usuario=r.id_usuario and ru.id_rol!=2 and ru.id_usuario=u.id_usuario
group by u.Nombre,u.fotografia 
order by CANTIDAD desc
)where rownum <=10


commit

select * from tema

select * from ciencia

select * from tema_ciencia

insert into tema_ciencia(id_tema,id_ciencia) values(10,3)

select count(t.NO_RESP) as cuenta from tema t

select u.nombre from usuario u, Tema t, tema_ciencia tc, respuesta r where id_ciencia=1 and t.id_tema=tc.id_tema and r.ID_TEMA=t.id_tema 
group by u.id_usuario

select  u.nombre, u.fotografia, count(t.NO_RESP) as cuenta from usuario u, tema t, tema_ciencia tc where tc.id_ciencia=1 and t.id_tema= tc.id_tema 
and t.id_usuario=u.id_usuario
group by id_usuario



select * from(select c.NOMBRE, count(r.Id_Respuesta) as CANTIDAD from respuesta r, ciencia c, tema_ciencia tc, tema t
where c.id_ciencia=tc.id_ciencia and tc.id_tema=t.id_tema and r.id_tema=tc.id_tema
group by c.Nombre 
order by CANTIDAD desc
) where rownum <=3

select * from ciencia
select c.NOMBRE from ciencia c, tema t, tema_ciencia tc,respuesta r where c.ID_CIENCIA=tc.ID_CIENCIA and t.ID_TEMA=tc.ID_TEMA




SELECT * from tema
select* from tema_ciencia


select*from(
select u.nombre, count(id_tema) as CANTIDAD from usuario u, Tema t, rol_usuario ru  where u.id_usuario=t.id_usuario and ru.id_rol!=2 and ru.id_usuario=u.id_usuario
group by u.nombre 
order by CANTIDAD desc
)where rownum<=5

select * from(
select u.nombre, count(t.TITULO) as CANTIDAD from usuario u, tema t, tema_ciencia tc, rol_usuario ru where 
tc.id_ciencia=4 and tc.id_tema=t.id_tema and u.id_usuario = t.id_usuario and ru.id_rol!=2 and ru.id_usuario=u.id_usuario
group by u.nombre
order by CANTIDAD desc
)where rownum<=5

select*from(
select u.nombre, count(id_tema) as CANTIDAD from usuario u, Tema t, rol_usuario ru  where u.id_usuario=t.id_usuario and ru.id_rol=2 and ru.id_usuario=u.id_usuario
group by u.nombre 
order by CANTIDAD desc
)where rownum<=5

select * from(
select u.nombre, count(t.TITULO) as CANTIDAD from usuario u, tema t, tema_ciencia tc, rol_usuario ru where 
tc.id_ciencia=4 and tc.id_tema=t.id_tema and u.id_usuario = t.id_usuario and ru.id_rol=2 and ru.id_usuario=u.id_usuario
group by u.nombre
order by CANTIDAD desc
)where rownum<=5


