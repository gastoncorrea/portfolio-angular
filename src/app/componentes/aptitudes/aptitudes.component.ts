import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-aptitudes',
  templateUrl: './aptitudes.component.html',
  styleUrls: ['./aptitudes.component.css']
})
export class AptitudesComponent implements OnInit {
  form: FormGroup;
  valorNombre:any;
  valorNivel:any;

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      nombre:['',[Validators.required, Validators.maxLength(50)]],
      nivel:['',[Validators.required]]
    })
   }

  ngOnInit(): void {
  }

  get Nombre(){
    this.valorNombre = this.form.get('nombre');
    return this.valorNombre;
  }

  get Nivel(){
    this.valorNivel = this.form.get('nivel');
    console.log(this.valorNivel);
    return this.valorNivel;
  }

}
