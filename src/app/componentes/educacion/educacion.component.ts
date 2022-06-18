import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EducacionService } from '../../servicios/educacion.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css'],
})
export class EducacionComponent implements OnInit {
  // VARIABLE QUE GUARDA LOS DATOS QUE LLEGAN DEL SERVIDOR
  persona: any;
  // VARIABLE QUE GUARDA LA LISTA DE EDUCACION QUE LLEGA DEL SERVIDOR
  listaEducacion: any;
  // Formularios para agregar y editar educacion
  form: FormGroup;
  formEditar: FormGroup;
  // Variables que contienen los estdos de los input de formularios
  valorNombre: any;
  valorLogo: any;
  valorInicio: any;
  valorFin: any;
  valorTitulo: any;

  valorNombreEditar: any;
  valorLogoEditar: any;
  valorInicioEditar: any;
  valorFinEditar: any;
  valorTituloEditar: any;

  constructor(
    private formBuilder: FormBuilder,
    private educacionService: EducacionService,
    public authService: AuthService
  ) {
    // FORMULARIO PARA GUARDAR UNA NUEVA EDUCACION
    this.form = formBuilder.group({
      nombre_institucion: ['', [Validators.required, Validators.maxLength(50)]],
      logo: ['', [Validators.maxLength(200)]],
      fecha_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      titulo: ['', [Validators.required, Validators.maxLength(50)]],
      persona: this.formBuilder.group({
        idpersona: ['', []],
      }),
    });
    // FORMULARIO PARA MODIFICAR UNA EDUCACION
    this.formEditar = formBuilder.group({
      idEducacionEditar: ['', []],
      nombre_institucionEditar: [
        '',
        [Validators.required, Validators.maxLength(50)],
      ],
      logoEditar: ['', [Validators.maxLength(200)]],
      fecha_inicioEditar: ['', [Validators.required]],
      fecha_finEditar: ['', [Validators.required]],
      tituloEditar: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }
  // METODO GET PARA TRAER VALORES DE CADA INPUT Y VERIFICAR SI SON VALIDOS
  get Nombre() {
    this.valorNombre = this.form.get('nombre_institucion');
    return this.valorNombre;
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

  get Titulo() {
    this.valorTitulo = this.form.get('titulo');
    return this.valorTitulo;
  }
  get NombreEditar() {
    this.valorNombreEditar = this.formEditar.get('nombre_institucionEditar');
    return this.valorNombreEditar;
  }

  get LogoEditar() {
    this.valorLogoEditar = this.formEditar.get('logoEditar');
    return this.valorLogoEditar;
  }

  get InicioEditar() {
    this.valorInicioEditar = this.formEditar.get('fecha_inicioEditar');
    return this.valorInicioEditar;
  }

  get FinEditar() {
    this.valorFinEditar = this.formEditar.get('fecha_finEditar');
    return this.valorFinEditar;
  }

  get TituloEditar() {
    this.valorTituloEditar = this.formEditar.get('tituloEditar');
    return this.valorTituloEditar;
  }

  ngOnInit(): void {
    // FUNCION QUE HACE PETICION AL SERVICO PARA TRAER DATOS DEL SERVIDOR
    this.educacionService.obtenerDatos().subscribe((data) => {
      this.persona = data;
      this.listaEducacion = data.educacion;
    });
  }
  // FUNCION PARA ENVIAR NUEVA EDUCACION AL SERVIDOR
  enviar(e: Event) {
    e.preventDefault();
    if (this.form.valid) {
      this.educacionService
        .guardarNuevaEducacion(this.form.value)
        .subscribe((data) => {
          alert(data);
          // FUNCION PARA RECARGAR DATOS LUEGO DE ENVIAR FORM
          this.educacionService.obtenerDatos().subscribe((data) => {
            this.persona = data;
            this.listaEducacion = data.educacion;
          });
        });
// metodo para limpiar campos de modal
        this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }
  // FUNCION PARA MODIFICAR UNA EDUCACION
  enviarModificar(e: Event) {
    e.preventDefault;
    if (this.formEditar.valid) {
      this.educacionService
        .modificarEducacion(this.formEditar.value)
        .subscribe((data) => {
          alert('EDUCACION MODIFICADA CON EXITO');

          this.educacionService.obtenerDatos().subscribe((data) => {
            //  FUNCION PARA RECUPERAR DATOS LUEGO DE MODIFICAR EDUCACION
            this.persona = data;
            this.listaEducacion = data.educacion;
          });
        });
    } else {
      this.formEditar.markAllAsTouched();
    }
  }
  // FUNCION QUE CARGA DATOS EN EL MODAL PARA MODIFICAR UNA EXPERIENCIA
  cargarDatosModal(cabe: any) {
    this.formEditar.setValue({
      idEducacionEditar: cabe.ideducacion,
      nombre_institucionEditar: cabe.nombre_institucion,
      logoEditar: cabe.logo,
      fecha_inicioEditar: cabe.fecha_inicio,
      fecha_finEditar: cabe.fecha_fin,
      tituloEditar: cabe.titulo,
    });
  }
  // ELIMINAR UNA EDUCACION
  eliminar(id: any) {
    this.educacionService.eliminarEducacion(id).subscribe((data) => {
      alert(data);
      // RECARGAR DATOS LUEGO DE ELIMINAR
      this.educacionService.obtenerDatos().subscribe((data) => {
        this.persona = data;
        this.listaEducacion = data.educacion;
      });
    });
  }
}
