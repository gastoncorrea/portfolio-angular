import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from '../../servicios/portfolio.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css'],
})
export class CabeceraComponent implements OnInit {
  cabecera: any;
  // formulario para Editar Persona y residencia
  formEditar:FormGroup;
  // formResidencia: FormGroup;

  // valor que se obtienen del get de los formularios editar
  valorNombreEditar:any;
  valorApellidoEditar:any;
  valorPerfilEditar:any;
  valorLinkedinEditar:any;
  valorCelularEditar:any;

  valorDireccionEditar:any;
  valorLocalidadEditar:any;
  valorProvinciaEditar:any;
  valorPaisEditar:any;
  valorNacionalidadEditar:any;

  


  constructor(
              private portfolioService: PortfolioService,
              private formBuilder: FormBuilder,
              public authService:AuthService) {

                this.formEditar = this.formBuilder.group({
                  nombreEditar: ['',[Validators.required, Validators.maxLength(50)]],
                  apellidoEditar: ['',[Validators.required, Validators.maxLength(50)]],
                  imagen_perfilEditar: ['',[Validators.required, Validators.maxLength(100)]],
                  url_linkedinEditar: ['',[Validators.required, Validators.maxLength(100)]],
                  num_celularEditar: ['',[Validators.required, Validators.maxLength(20)]],
                  direccionEditar: ['',[Validators.required, Validators.maxLength(50)]],
                  localidadEditar: ['',[Validators.required, Validators.maxLength(50)]],
                  provinciaEditar: ['',[Validators.required, Validators.maxLength(50)]],
                  paisEditar: ['',[Validators.required, Validators.maxLength(50)]],
                  nacionalidadEditar: ['',[Validators.required, Validators.maxLength(50)]]
                })
              }
  

  // metodos get para traer valores de form Persona
  get NombreEditar(){
    this.valorNombreEditar = this.formEditar.get('nombreEditar');
    return this.valorNombreEditar;
  }
  get ApellidoEditar(){
    this.valorApellidoEditar = this.formEditar.get('apellidoEditar');
    return this.valorApellidoEditar;
  }
  get PerfilEditar(){
    this.valorPerfilEditar = this.formEditar.get('imagen_perfilEditar');
    return this.valorPerfilEditar;
  }
  get UrlEditar(){
    this.valorLinkedinEditar = this.formEditar.get('url_linkedinEditar');
    return this.valorLinkedinEditar;
  }
  get CelularEditar(){
    this.valorCelularEditar = this.formEditar.get('num_celularEditar');
    return this.valorCelularEditar;
  }

  // metodo para traer valores de form residencia

  get DireccionEditar(){
    this.valorDireccionEditar = this.formEditar.get('direccionEditar');
    return this.valorDireccionEditar;
  }

  get LocalidadEditar(){
    this.valorLocalidadEditar = this.formEditar.get('localidadEditar');
    return this.valorLocalidadEditar;
  }

  get ProvinciaEditar(){
    this.valorProvinciaEditar = this.formEditar.get('provinciaEditar');
    return this.valorProvinciaEditar;
  }

  get PaisEditar(){
    this.valorPaisEditar = this.formEditar.get('paisEditar');
    return this.valorPaisEditar;
  }

  get NacionalidadEditar(){
    this.valorNacionalidadEditar = this.formEditar.get('nacionalidadEditar');
    return this.valorNacionalidadEditar;
  }

  // funcion para enviar formulario para editar persona y residencia

  enviar( id:number){
    if(this.formEditar.valid){

      this.portfolioService.modificarPersona(this.formEditar.value, id).subscribe(data=>{
        console.log("modificar Persona" + data);
        alert(data);
        // LLamas funcion para obtener los datos modificados
        this.portfolioService.obtenerDatos().subscribe(data => {
          this.cabecera = data;
        })
      })
    }
  }

  ngOnInit(): void {

     this.portfolioService.obtenerDatos().subscribe(data => {
       console.log(data);
       this.cabecera = data;
     });
  }
}
