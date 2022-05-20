import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-experiencia-y-educacion',
  templateUrl: './experiencia-y-educacion.component.html',
  styleUrls: ['./experiencia-y-educacion.component.css']
})
export class ExperienciaYEducacionComponent implements OnInit {
  form: FormGroup;
  valorNombre:any;
  valorPuesto:any;
  valorLogo:any;
  valorInicio:any;
  valorFin: any;
  valorTotal:any;

  constructor(private formBuilder:FormBuilder) {
    this.form = formBuilder.group({
      nombre:['',[Validators.maxLength(50),Validators.required]],
      puesto:['',[Validators.maxLength(20),Validators.required]],
      logo:['',[Validators.maxLength(50)]],
      fecha_inicio:['',[Validators.required]],
      fecha_fin:['',[Validators.required]],
      tiempo_trab:['',[Validators.required, Validators.maxLength(50)]]
    })
   }

  ngOnInit(): void {
  }

  get Nombre(){
    this.valorNombre = this.form.get('nombre');
    return this.valorNombre;
  }

  get Puesto(){
    this.valorPuesto = this.form.get('puesto');
    return this.valorPuesto;
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

  get Total(){
    this.valorTotal = this.form.get('tiempo_trab');
    return this.valorTotal;
  }
}
