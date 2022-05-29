import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {EducacionService} from '../../servicios/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  cabecera:any;

  form: FormGroup;
  valorNombre:any;
  valorLogo:any;
  valorInicio:any;
  valorFin:any;
  valorTitulo:any;

  constructor(private formBuilder:FormBuilder,
              private educacionService:EducacionService) {
    this.form = formBuilder.group({
      nombre_institucion: ['',[Validators.required, Validators.maxLength(50)]],
      logo:['',[Validators.maxLength(50)]],
      fecha_inicio: ['',[Validators.required]],
      fecha_fin:['',[Validators.required]],
      titulo: ['',[Validators.required, Validators.maxLength(50)]
    ]
    })
   }

   enviar(e:Event){
    e.preventDefault();

    if(this.form.valid){
      console.log('form educacion valido');
    }else{
      this.form.markAllAsTouched();
    }
   }

  ngOnInit(): void {
    this.educacionService.obtenerDatos().subscribe(data => {
      console.log(data);
      this.cabecera = data.educacion;
    });
  }

  get Nombre(){
    this.valorNombre = this.form.get('nombre_institucion');
    return this.valorNombre;
  }

  get Logo(){
    this.valorLogo = this.form.get('logo');
    return this.valorLogo;
  }

  get Inicio(){
    this.valorInicio = this.form.get('fecha_inicio');
    return this.valorInicio;
  }

  get Fin(){
    this.valorFin = this.form.get('fecha_fin');
    return this.valorFin;
  }

  get Titulo(){
    this.valorTitulo = this.form.get('titulo');
    return this.valorTitulo;
  }

}
