import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExperienciaService } from '../../servicios/experiencia.service';
import { AuthService } from 'src/app/servicios/auth.service';

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
  valorDescripcion: any;
  valorLogo: any;
  valorInicio: any;
  valorFin: any;
  valorTotal: any;
  // variable que contiene los estados de los input para editar una experiencia
  valorNombreEditar: any;
  valorPuestoEditar: any;
  valorDescripcionEditar: any;
  valorLogoEditar: any;
  valorInicioEditar: any;
  valorFinEditar: any;
  valorTotalEditar: any;

  constructor(
    private formBuilder: FormBuilder,
    private experienciaService: ExperienciaService,
    public authService: AuthService
  ) {
    // FORM PARA GUARDAR UNA NUEVA EXPERIENCIA LABORAL
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.maxLength(50), Validators.required]],
      puesto: ['', [Validators.maxLength(50), Validators.required]],
      descripcion: ['', [Validators.required, Validators.maxLength(300)]],
      logo: ['', [Validators.maxLength(150)]],
      fecha_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      tiempo_trab: ['', [Validators.required, Validators.maxLength(50)]],
      persona: this.formBuilder.group({
        idpersona: ['', []],
      }),
    });
    // FORM PARA EDITAR UNA EXPERIENCIA LABORAL
    this.formEditar = this.formBuilder.group({
      idExperienciaEditar: ['', []],
      nombreEditar: ['', [Validators.maxLength(50), Validators.required]],
      puestoEditar: ['', [Validators.maxLength(50), Validators.required]],
      descripcionEditar: ['', [Validators.required, Validators.maxLength(300)]],
      logoEditar: ['', [Validators.maxLength(150)]],
      fecha_inicioEditar: ['', [Validators.required]],
      fecha_finEditar: ['', [Validators.required]],
      tiempo_trabEditar: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  // METODOS GET PARA RECUPERAR VALOR DE INPUTS DE FORM
  get Nombre() {
    this.valorNombre = this.form.get('nombre');
    return this.valorNombre;
  }

  get Puesto() {
    this.valorPuesto = this.form.get('puesto');
    return this.valorPuesto;
  }

  get Descripcion() {
    this.valorDescripcion = this.form.get('descripcion');
    return this.valorDescripcion;
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

  get DescripcionEditar() {
    this.valorDescripcionEditar = this.form.get('descripcionEditar');
    return this.valorDescripcionEditar;
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
  // RECARGAR DATOS AL INICIAR COMPONENTE
  ngOnInit(): void {
    this.experienciaService.obtenerDatos().subscribe((data) => {
      console.log(data);
      this.cabecera = data;
      this.experiencia = data.experiencia;
    });
  }
  // ENVIAR FORMULARIO PARA EDITAR UNA EXPERIENCIA LABORAL
  enviarFormEditar(e: Event) {
    e.preventDefault();
    if (this.formEditar.valid) {
      //llamada al servicio para enviar datos al servidor
      this.experienciaService
        .modificarExperiencia(this.formEditar.value)
        .subscribe((data) => {
          alert('Experiencia Laboral modificada');
          // RECUPERAR DATOS LUEGO DE MODIFICAR EXPERIENCIA LABORAL
          this.experienciaService.obtenerDatos().subscribe((resp) => {
            this.cabecera = resp;
            this.experiencia = resp.experiencia;
          });
        });
    } else {
      this.formEditar.markAllAsTouched();
    }
  }
  // ENVIAR FORM PARA GUARDAR UNA NUEVA EXPERIENCIA LABORAL
  enviarNuevaExperiencia(e: Event) {
    e.preventDefault;
    if (this.form.valid) {
      // llamada al servicio para agregar nueva experienciaService
      this.experienciaService
        .agregarExperiencia(this.form.value)
        .subscribe((data) => {
          alert(data);
          // RECUPERAR DATOS LUEGO DE GUARDAR UNA NUEVA EXPERIENCIA
          this.experienciaService.obtenerDatos().subscribe((data) => {
            this.cabecera = data;
            this.experiencia = data.experiencia;
          });
        });

        this.form.reset();
    }
  }
  // ELIMINAR UNA EXPERIENCIA LABORAL
  eliminar(id: any) {
    this.experienciaService.eliminarExperiencia(id).subscribe((data) => {
      alert(data);
      // RECUPERAR DATOS LUEGO DE ELIMINAR UNA EXPERIENCIA LABORAL
      this.experienciaService.obtenerDatos().subscribe((data) => {
        this.cabecera = data;
        this.experiencia = data.experiencia;
      });
    });
  }
  // CARGAR MODAL CON DATOS DE UNA EXPERIENCIA LABORAL
  traerDatos(cabe: any) {
    this.formEditar.setValue({
      idExperienciaEditar: cabe.idexp_laboral,
      nombreEditar: cabe.nombre,
      puestoEditar: cabe.puesto,
      descripcionEditar: cabe.descripcion,
      logoEditar: cabe.logo,
      fecha_inicioEditar: cabe.fecha_inicio,
      fecha_finEditar: cabe.fecha_fin,
      tiempo_trabEditar: cabe.tiempo_trab,
    });
  }
}
