import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { PortfolioService } from '../../servicios/portfolio.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css'],
})
export class CabeceraComponent implements OnInit {
  cabecera: any;
  // formulario para persona
  form: FormGroup;
  // formulario para residencia
  formResidencia: FormGroup;

  // valor que se obtienen del get de los formularios
  valorNombre:any;
  valorApellido:any;
  valorPerfil:any;
  valorLinkedin:any;
  valorCelular:any;

  valorDireccion:any;
  valorLocalidad:any;
  valorProvincia:any;
  valorPais:any;
  valorNacionalidad:any;


  constructor(private portfolioService: PortfolioService,
              private formBuilder: FormBuilder) {

                this.form = this.formBuilder.group({
                  nombre: ['',[Validators.required, Validators.maxLength(50)]],
                  apellido: ['',[Validators.required, Validators.maxLength(50)]],
                  imagen_perfil: ['',[Validators.required, Validators.maxLength(100)]],
                  url_linkedin: ['',[Validators.required, Validators.maxLength(100)]],
                  num_celular: ['',[Validators.required, Validators.maxLength(20)]]
                })

                this.formResidencia = this.formBuilder.group({
                  direccion: ['',[Validators.required, Validators.maxLength(50)]],
                  localidad: ['',[Validators.required, Validators.maxLength(50)]],
                  provincia: ['',[Validators.required, Validators.maxLength(50)]],
                  pais: ['',[Validators.required, Validators.maxLength(50)]],
                  nacionalidad: ['',[Validators.required, Validators.maxLength(50)]]
                })
              }
  
  // metodos get para traer valores de form Persona
  get Nombre(){
    this.valorNombre = this.form.get('nombre');
    return this.valorNombre;
  }
  get Apellido(){
    this.valorApellido = this.form.get('apellido');
    return this.valorApellido;
  }
  get Perfil(){
    this.valorPerfil = this.form.get('imagen_perfil');
    return this.valorPerfil;
  }
  get Url(){
    this.valorLinkedin = this.form.get('url_linkedin');
    return this.valorLinkedin;
  }
  get Celular(){
    this.valorCelular = this.form.get('num_celular');
    return this.valorCelular;
  }

  // metodo para traer valores de form residencia

  get Direccion(){
    this.valorDireccion = this.form.get('direccion');
    return this.valorDireccion;
  }

  get Localidad(){
    this.valorLocalidad = this.form.get('localidad');
    return this.valorLocalidad;
  }

  get Provincia(){
    this.valorProvincia = this.form.get('provincia');
    return this.valorProvincia;
  }

  get Pais(){
    this.valorPais = this.form.get('pais');
    return this.valorPais;
  }

  get Nacionalidad(){
    this.valorNacionalidad = this.form.get('nacionalidad');
    return this.valorNacionalidad;
  }

  ngOnInit(): void {
    // this.portfolioService.obtenerDatos().subscribe(data => {
    //   console.log(data);
    //   this.cabecera = data;
    // });
  }
}
