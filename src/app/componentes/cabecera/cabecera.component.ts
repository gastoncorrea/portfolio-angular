import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from '../../servicios/portfolio.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css'],
})
export class CabeceraComponent implements OnInit {
  // VARIABLE QUE CONTIENE LOS DATOS QUE LLEGAN DEL SERVIDOR
  cabecera: any;
  // formulario para Editar Persona y residencia
  formEditar: FormGroup;
  // formResidencia: FormGroup;

  // valor que se obtienen del get de los formularios editar
  valorNombreEditar: any;
  valorApellidoEditar: any;
  valorPerfilEditar: any;
  valorLinkedinEditar: any;
  valorCelularEditar: any;

  valorDireccionEditar: any;
  valorLocalidadEditar: any;
  valorProvinciaEditar: any;
  valorPaisEditar: any;
  valorNacionalidadEditar: any;

  constructor(
    private portfolioService: PortfolioService,
    private formBuilder: FormBuilder,
    public authService: AuthService
  ) {
    // FORMULARIO PARA EDITAR DATOS PERSONALES Y RESIDENCIA
    this.formEditar = this.formBuilder.group({
      idPersonaEditar: ['', []],
      descripcionEditar: ['', []],
      nombreEditar: ['', [Validators.required, Validators.maxLength(50)]],
      apellidoEditar: ['', [Validators.required, Validators.maxLength(50)]],
      imagen_perfilEditar: [
        '',
        [Validators.required, Validators.maxLength(100)],
      ],
      url_linkedinEditar: [
        '',
        [Validators.required, Validators.maxLength(100)],
      ],
      num_celularEditar: ['', [Validators.required, Validators.maxLength(20)]],
      idResidenciaEditar: ['', []],
      direccionEditar: ['', [Validators.required, Validators.maxLength(50)]],
      localidadEditar: ['', [Validators.required, Validators.maxLength(50)]],
      provinciaEditar: ['', [Validators.required, Validators.maxLength(50)]],
      paisEditar: ['', [Validators.required, Validators.maxLength(50)]],
      nacionalidadEditar: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  // metodos get para traer valores de form Persona
  get NombreEditar() {
    this.valorNombreEditar = this.formEditar.get('nombreEditar');
    return this.valorNombreEditar;
  }
  get ApellidoEditar() {
    this.valorApellidoEditar = this.formEditar.get('apellidoEditar');
    return this.valorApellidoEditar;
  }
  get PerfilEditar() {
    this.valorPerfilEditar = this.formEditar.get('imagen_perfilEditar');
    return this.valorPerfilEditar;
  }
  get UrlEditar() {
    this.valorLinkedinEditar = this.formEditar.get('url_linkedinEditar');
    return this.valorLinkedinEditar;
  }
  get CelularEditar() {
    this.valorCelularEditar = this.formEditar.get('num_celularEditar');
    return this.valorCelularEditar;
  }

  // metodo para traer valores de form residencia

  get DireccionEditar() {
    this.valorDireccionEditar = this.formEditar.get('direccionEditar');
    return this.valorDireccionEditar;
  }

  get LocalidadEditar() {
    this.valorLocalidadEditar = this.formEditar.get('localidadEditar');
    return this.valorLocalidadEditar;
  }

  get ProvinciaEditar() {
    this.valorProvinciaEditar = this.formEditar.get('provinciaEditar');
    return this.valorProvinciaEditar;
  }

  get PaisEditar() {
    this.valorPaisEditar = this.formEditar.get('paisEditar');
    return this.valorPaisEditar;
  }

  get NacionalidadEditar() {
    this.valorNacionalidadEditar = this.formEditar.get('nacionalidadEditar');
    return this.valorNacionalidadEditar;
  }

  // funcion para enviar formulario para editar persona y residencia

  enviar() {
    if (this.formEditar.valid) {
      this.portfolioService
        .modificarPersona(this.formEditar.value)
        .subscribe((data) => {
          alert('Datos personales modificado');

          // LLamas funcion para obtener los datos modificados
          this.portfolioService.obtenerDatos().subscribe((data) => {
            this.cabecera = data;
          });
        });
      // funcion para modificar los datos de residencia de la persona
      this.portfolioService
        .modificarResidencia(this.formEditar.value)
        .subscribe((data) => {
          alert('Datos de residencia modificados correctamente');

          // LLamas funcion para obtener los datos modificados
          this.portfolioService.obtenerDatos().subscribe((data) => {
            this.cabecera = data;
          });
        });
    } else {
      this.formEditar.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    // PETICION DE DATOS AL SERVIDOR
    this.portfolioService.obtenerDatos().subscribe((data) => {
    
      this.cabecera = data;
    });
  }

  cargarModal(datosPersona: any) {
    // FUNCION QUE CARGA LOS EN EL MODAL PARA MODIFICARLO
    this.formEditar.setValue({
      idPersonaEditar: datosPersona.idPersona,
      descripcionEditar: datosPersona.descripcion_mi,
      nombreEditar: datosPersona.nombrePersona,
      apellidoEditar: datosPersona.apellidoPersona,
      imagen_perfilEditar: datosPersona.imagen_perfil,
      url_linkedinEditar: datosPersona.url_linkedin,
      num_celularEditar: datosPersona.num_celular,
      idResidenciaEditar: datosPersona.residencia.idresidencia,
      direccionEditar: datosPersona.residencia.direccion,
      localidadEditar: datosPersona.residencia.localidad,
      provinciaEditar: datosPersona.residencia.provincia,
      paisEditar: datosPersona.residencia.pais,
      nacionalidadEditar: datosPersona.residencia.nacionalidad,
    });
  }
}
