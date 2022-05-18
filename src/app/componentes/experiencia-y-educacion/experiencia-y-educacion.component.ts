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

  constructor(private formBuilder:FormBuilder) {
    this.form = formBuilder.group({
      nombre:['',[Validators.maxLength(20),Validators.required]],
      puesto:['',[Validators.maxLength(20),Validators.required]],
      logo:['',[Validators.maxLength(50)]],
      fecha_inicio:['',[Validators.required]],
      fecha_fin:['',[Validators.required]],
      tiempo_trab:['',[Validators.required]]
    })
   }

  ngOnInit(): void {
  }

  get Nombre(){
    this.valorNombre = this.form.get('nombre');
    return this.valorNombre;
  }
}
