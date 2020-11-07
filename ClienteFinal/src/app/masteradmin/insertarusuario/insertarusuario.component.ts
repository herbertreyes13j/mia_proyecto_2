import { Component, OnInit } from '@angular/core';
import {CrudcarreraService} from '../../services/crudcarrera.service';
import {CrearrolserviceService} from '../../services/crearrolservice.service';
import { FormBuilder, FormGroup, FormArray,FormControl } from '@angular/forms';
import {carrerausuario} from '../../models/carrerausuario';
import {rolusuario} from '../../models/rolusuario';
import {usuario} from '../../models/usuario';
import {CrudusuarioService} from '../../services/crudusuario.service';
@Component({
  selector: 'app-insertarusuario',
  templateUrl: './insertarusuario.component.html',
  styleUrls: ['./insertarusuario.component.css']
})
export class InsertarusuarioComponent implements OnInit {
 form: FormGroup; 
 orders:any=[];
 roles:any=[];
usuario:usuario= {} as any;
rolusuario:rolusuario={} as any;
carrerausuario:carrerausuario={} as any;
  
 constructor(private cus:CrudusuarioService, private ccs:CrudcarreraService,private formBuilder: FormBuilder, private crs:CrearrolserviceService) { 
  this.form=this.formBuilder.group({
    orders:new FormArray([]),
    roles:new FormArray([])
  });
  

  }
  private addCheckboxes() {
    this.orders.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.form.controls.orders as FormArray).push(control);
    });

    this.roles.map((o,i)=>{
      const control = new FormControl(i===0);
      (this.form.controls.roles as FormArray).push(control);
    });
  }
  ngOnInit() {   

    this.llenardatos();
  
  }

  async llenardatos(){
    await this.crs.getroles().subscribe(
      res=>{
        this.roles=res;
      },
      err=>console.log(err)
    );
    await this.ccs.getcarreras().subscribe(
      res=>{
        this.orders=res;
        this.form=this.formBuilder.group({
          orders:new FormArray([]),
          roles:new FormArray([])
        });
        this.addCheckboxes();
      },
      err => console.log(err)
    );
  }

  submit(car,nam,cor,tel,pas) {
    if(car.value && nam.value && cor.value && tel.value && pas.value){
      this.usuario.CARNET=car.value;
      this.usuario.NOMBRE=nam.value;
      this.usuario.CORREO=cor.value;
      this.usuario.TELEFONO=tel.value;
      this.usuario.CLAVE_ACCESO=pas.value;
      this.usuario.FOTOGRAFIA="";  
      this.cus.crearusuario(this.usuario).subscribe(
        res=> {
          alert('USUARIO CREADO EXITOSAMENTE');

          this.cus.getusuarioid(this.usuario.CORREO).subscribe(
            res=>{
              let id:String=res[0][0];
              this.carrerausuario.ID_USUARIO=res[0][0];
              this.rolusuario.ID_USUARIO=res[0][0];

              let selectedOrderIds = this.form.value.orders
              .map((v, i) => v ? this.orders[i].ID_CARRERA : null)
              .filter(v => v !== null);
            console.log(selectedOrderIds);
        
            for(let uno of selectedOrderIds){
              this.carrerausuario.ID_CARRERA=uno;
              this.cus.crearcarrerausuario(this.carrerausuario).subscribe(
                res=>{
                },
                err=>{
                }
              );
            }
        
           let selectedRolesIds = this.form.value.roles
            .map((v,i)=> v ? this.roles[i].ID_ROL:null)
            .filter(v=> v !==null);
            console.log(selectedRolesIds);
        
            for(let uno of selectedRolesIds){
             this.rolusuario.ID_ROL=uno;
             this.cus.crearsolusuario(this.rolusuario).subscribe();
            }
            },
            err=>{

            }
          );
        },
      err=> {
       alert('ERROR: USUARIO YA EXISTE');
      }


      );

      car.value="";
      nam.value="";
      cor.value="";
      tel.value="";
      pas.value="";
    }else{
      alert('INGRESE TODOS LOS DATOS');
    }

  }

  
  
}
