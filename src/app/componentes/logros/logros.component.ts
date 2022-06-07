import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ProyectoService} from '../../servicios/proyecto.service';

@Component({
  selector: 'app-logros',
  templateUrl: './logros.component.html',
  styleUrls: ['./logros.component.css']
})
export class LogrosComponent implements OnInit {
  persona:any;
  proyectos:any;
  // form que conctienen los input para editar y agregar proyectos
  form: FormGroup;
  formEditar:FormGroup;
  // Variables que contienen estados de inputs de forms
  valorNombre:any;
  valorDescripcion:any;
  valorUrl:any;
  valorNombreEditar:any;
  valorDescripcionEditar:any;
  valorUrlEditar:any;

  constructor(private formBuilder: FormBuilder,
              private proyectoService:ProyectoService) {
    this.form = this.formBuilder.group({
      nombre:['',[Validators.required, Validators.maxLength(30)]],
      descripcion:['',[Validators.required, Validators.maxLength(200)]],
      url:['',[Validators.required, Validators.maxLength(50)]],
      persona: this.formBuilder.group({
        idpersona:['',[]]
      })
    })
    this.formEditar = this.formBuilder.group({
      idProyectoEditar:['',[]],
      nombreEditar:['',[Validators.required, Validators.maxLength(30)]],
      descripcionEditar:['',[Validators.required, Validators.maxLength(200)]],
      urlEditar:['',[Validators.required, Validators.maxLength(50)]]
    })
   }

   
   get Nombre(){
     this.valorNombre = this.form.get('nombre');
    return this.valorNombre;
  }

  get Descripcion(){
    this.valorDescripcion = this.form.get('descripcion');
    return this.valorDescripcion;
  }

  get Url(){
    this.valorUrl = this.form.get('url');
    return this.valorUrl;
  }
  get NombreEditar(){
    this.valorNombreEditar = this.form.get('nombreEditar');
    return this.valorNombreEditar;
  }

  get DescripcionEditar(){
    this.valorDescripcionEditar = this.form.get('descripcionEditar');
    return this.valorDescripcionEditar;
  }

  get UrlEditar(){
    this.valorUrlEditar = this.form.get('urlEditar');
    return this.valorUrlEditar;
  }

  ngOnInit(): void {
    this.proyectoService.obtenerDatos().subscribe(data => {
      console.log("Educacion data" + data);
      this.persona = data;
      this.proyectos = data.proyecto;
    });
  }

  enviar(e:Event){
    e.preventDefault();
    console.log(this.form.value);
    if(this.form.valid){
      this.proyectoService.enviarDatos(this.form.value).subscribe(resp=>{
        alert(resp);
      })
    }else{
      this.form.markAllAsTouched();
    }
  }

  editarProyecto(e:Event){
    e.preventDefault();
    console.log("VALOR DEL FORM EDITAR PROYECTO: ");
    console.log(this.formEditar.value);
    if(this.formEditar.valid){
      this.proyectoService.modificarDatos(this.formEditar.value).subscribe(data=>{
        alert(JSON.stringify(data));
      })
    }
    
  }

  cargarModal(proyecto: any){

    this.formEditar.setValue({
      idProyectoEditar: proyecto.idproyecto,
      nombreEditar: proyecto.nombre,
      descripcionEditar: proyecto.descripcion,
      urlEditar: proyecto.url
    });
  }

}
