import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ProyectoService} from '../../servicios/proyecto.service';

@Component({
  selector: 'app-logros',
  templateUrl: './logros.component.html',
  styleUrls: ['./logros.component.css']
})
export class LogrosComponent implements OnInit {
  cabecera:any;

  form: FormGroup;
  valorNombre:any;
  valorDescripcion:any;
  valorUrl:any;

  constructor(private formBuilder: FormBuilder,
              private proyectoService:ProyectoService) {
    this.form = this.formBuilder.group({
      nombre:['',[Validators.required, Validators.maxLength(30)]],
      descripcion:['',[Validators.required, Validators.maxLength(200)]],
      url:['',[Validators.required, Validators.maxLength(50)]]
    })
   }

  ngOnInit(): void {
    this.proyectoService.obtenerDatos().subscribe(data => {
      console.log("Educacion data" + data);
      this.cabecera = data.proyecto;
    });
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

  enviar(e:Event){
    e.preventDefault();
    if(this.form.valid){
      console.log('funciona el boton');
    }else{
      this.form.markAllAsTouched();
    }
  }

}
