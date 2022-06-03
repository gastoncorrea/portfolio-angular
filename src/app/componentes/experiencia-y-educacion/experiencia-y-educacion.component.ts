import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExperienciaService } from '../../servicios/experiencia.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-experiencia-y-educacion',
  templateUrl: './experiencia-y-educacion.component.html',
  styleUrls: ['./experiencia-y-educacion.component.css'],
})
export class ExperienciaYEducacionComponent implements OnInit {
  // contiene los valores de experiencia traidos de la api
  cabecera: any;

  experiencia: any;

  form: FormGroup;
  // Formulario para editar Experiencia
  formEditar: FormGroup;
  // variable que contiene los estados de los input para agregar una nueva experiencia
  valorNombre: any;
  valorPuesto: any;
  valorLogo: any;
  valorInicio: any;
  valorFin: any;
  valorTotal: any;
  // variable que contiene los estados de los input para editar una experiencia
  valorNombreEditar: any;
  valorPuestoEditar: any;
  valorLogoEditar: any;
  valorInicioEditar: any;
  valorFinEditar: any;
  valorTotalEditar: any;

  constructor(
    private formBuilder: FormBuilder,
    private experienciaService: ExperienciaService
  ) {
    this.form = formBuilder.group({
      nombre: ['', [Validators.maxLength(50), Validators.required]],
      puesto: ['', [Validators.maxLength(20), Validators.required]],
      logo: ['', [Validators.maxLength(50)]],
      fecha_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      tiempo_trab: ['', [Validators.required, Validators.maxLength(50)]],
      persona: this.formBuilder.group({
        idpersona: ['', []],
      }),
    });
    this.formEditar = formBuilder.group({
      idExperienciaEditar: ['',[]],
      nombreEditar: ['', [Validators.maxLength(50), Validators.required]],
      puestoEditar: ['', [Validators.maxLength(20), Validators.required]],
      logoEditar: ['', [Validators.maxLength(50)]],
      fecha_inicioEditar: ['', [Validators.required]],
      fecha_finEditar: ['', [Validators.required]],
      tiempo_trabEditar: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }
  get Nombre() {
    this.valorNombre = this.form.get('nombre');
    return this.valorNombre;
  }

  get Puesto() {
    this.valorPuesto = this.form.get('puesto');
    return this.valorPuesto;
  }

  get Logo() {
    this.valorLogo = this.form.get('logo');
    return this.valorLogo;
  }

  get Inicio() {
    this.valorInicio = this.form.get('fecha_inicio');
    return this.valorInicio;
  }

  get Fin() {
    this.valorFin = this.form.get('fecha_fin');
    return this.valorFin;
  }

  get Total() {
    this.valorTotal = this.form.get('tiempo_trab');
    return this.valorTotal;
  }

  // funciones que devuelven estados de los input del form para editar experiencia
  
  get NombreEditar() {
    this.valorNombreEditar = this.form.get('nombreEditar');
    return this.valorNombreEditar;
  }

  get PuestoEditar() {
    this.valorPuestoEditar = this.form.get('puestoEditar');
    return this.valorPuestoEditar;
  }

  get LogoEditar() {
    this.valorLogoEditar = this.form.get('logoEditar');
    return this.valorLogoEditar;
  }

  get InicioEditar() {
    this.valorInicioEditar = this.form.get('fecha_inicioEditar');
    return this.valorInicioEditar;
  }

  get FinEditar() {
    this.valorFinEditar = this.form.get('fecha_finEditar');
    return this.valorFinEditar;
  }

  get TotalEditar() {
    this.valorTotalEditar = this.form.get('tiempo_trabEditar');
    return this.valorTotalEditar;
  }

  ngOnInit(): void {
    this.experienciaService.obtenerDatos().subscribe((data) => {
      console.log(data);
      this.cabecera = data;
      this.experiencia = data.experiencia;
    });
  }

  enviarFormEditar(e: Event) {
    e.preventDefault();
    // if (this.formEditar.valid) {
      console.log('formulario valido Editar EXPERIENCIA');
      console.log(this.formEditar.value);
      //llamada al servicio para enviar datos al servidor
      this.experienciaService
        .modificarExperiencia(this.formEditar.value)
        .subscribe(data => {
          alert('Experiencia Modificada');
        });
    // } else {
      // this.formEditar.markAllAsTouched();
    // }
  }

  enviarNuevaExperiencia(e: Event) {
    e.preventDefault;
    if (this.form.valid) {
      console.log(
        'Nueva Experiencia FORM idPersona:*****' +
          this.form.value.persona.idPersona
      );
      // llamada al servicio para agregar nueva experienciaService
      this.experienciaService
        .agregarExperiencia(this.form.value)
        .subscribe((data) => {
          alert(data);
        });
        this.form.reset();
      this.experienciaService.obtenerDatos().subscribe((data) => {
        console.log(data);
        this.cabecera = data;
        this.experiencia = data.experiencia;
      });
    }
  }

  traerDatos(cabe:any){
    console.log(cabe.fecha_inicio);
    this.formEditar.setValue({idExperienciaEditar:cabe.idexp_laboral,nombreEditar:cabe.nombre,puestoEditar:cabe.puesto,logoEditar:cabe.logo,
      fecha_inicioEditar: cabe.fecha_inicio,fecha_finEditar:cabe.fecha_fin,tiempo_trabEditar:cabe.tiempo_trab});
    console.log(cabe);
    console.log(this.formEditar.value);
  }
}
