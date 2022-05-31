import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AptitudService} from '../../servicios/aptitud.service';

@Component({
  selector: 'app-aptitudes',
  templateUrl: './aptitudes.component.html',
  styleUrls: ['./aptitudes.component.css']
})
export class AptitudesComponent implements OnInit {
  cabecera: any;
  // form que contienen los input para agregar y editar Skills
  form: FormGroup;
  formEditar:FormGroup;
  // Editarariables que contienen los estados de los inputs para agregar y editar skills
  valorNombre:any;
  valorNivel:any;
  valorNombreEditar:any;
  valorNivelEditar:any;

  constructor(private formBuilder: FormBuilder,
              private aptitudService: AptitudService) {
    this.form = formBuilder.group({
      nombre:['',[Validators.required, Validators.maxLength(50)]],
      nivel:['',[Validators.required]]
    })
    this.formEditar = formBuilder.group({
      nombreEditar:['',[Validators.required, Validators.maxLength(50)]],
      nivelEditar:['',[Validators.required]]
    })
   }

   enviar(e:Event){
     e.preventDefault();

     if(this.form.valid){
       console.log('form skill valido');
     }else{
     }
   }

  ngOnInit(): void {
    this.aptitudService.obtenerDatos().subscribe(data => {
      console.log("Educacion data" + data);
      this.cabecera = data.aptitud;
    });
  }

  get Nombre(){
    this.valorNombre = this.form.get('nombre');
    return this.valorNombre;
  }

  get Nivel(){
    this.valorNivel = this.form.get('nivel');
    return this.valorNivel;
  }
  get NombreEditar(){
    this.valorNombreEditar = this.form.get('nombreEditar');
    return this.valorNombreEditar;
  }

  get NivelEditar(){
    this.valorNivelEditar = this.form.get('nivelEditar');
    return this.valorNivelEditar;
  }

}
