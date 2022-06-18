import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectoService } from '../../servicios/proyecto.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-logros',
  templateUrl: './logros.component.html',
  styleUrls: ['./logros.component.css'],
})
export class LogrosComponent implements OnInit {
  // VARIABLE QUE GUARDA DATOS TRAIDOS DEL SERVIDOR
  persona: any;
  // VARIABLE QUE GUARDA LISTA DE PROYECTOS TRAIDOS DEL SERVIDOR
  proyectos: any;
  // form que conctienen los input para editar y agregar proyectos
  form: FormGroup;
  formEditar: FormGroup;
  // Variables que contienen estados de inputs de forms
  valorNombre: any;
  valorDescripcion: any;
  valorUrl: any;
  valorNombreEditar: any;
  valorDescripcionEditar: any;
  valorUrlEditar: any;

  constructor(
    private formBuilder: FormBuilder,
    private proyectoService: ProyectoService,
    public authService: AuthService
  ) {
    // FORM PARA GUARDAR UN NUEVO PROYECTO
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      url: ['', [Validators.required, Validators.maxLength(50)]],
      persona: this.formBuilder.group({
        idpersona: ['', []],
      }),
    });
    // FORM PARA MODIFICAR UN PROYECTO
    this.formEditar = this.formBuilder.group({
      idProyectoEditar: ['', []],
      nombreEditar: ['', [Validators.required, Validators.maxLength(30)]],
      descripcionEditar: ['', [Validators.required, Validators.maxLength(200)]],
      urlEditar: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  //  METODOS GET PARA TRAER VALORES DE INPUT
  get Nombre() {
    this.valorNombre = this.form.get('nombre');
    return this.valorNombre;
  }

  get Descripcion() {
    this.valorDescripcion = this.form.get('descripcion');
    return this.valorDescripcion;
  }

  get Url() {
    this.valorUrl = this.form.get('url');
    return this.valorUrl;
  }
  get NombreEditar() {
    this.valorNombreEditar = this.form.get('nombreEditar');
    return this.valorNombreEditar;
  }

  get DescripcionEditar() {
    this.valorDescripcionEditar = this.form.get('descripcionEditar');
    return this.valorDescripcionEditar;
  }

  get UrlEditar() {
    this.valorUrlEditar = this.form.get('urlEditar');
    return this.valorUrlEditar;
  }

  ngOnInit(): void {
    // FUNCION QUE TRAE DATOS DEL SERVIDOR AL INICIAR COMPONENTE
    this.proyectoService.obtenerDatos().subscribe((data) => {
      this.persona = data;
      this.proyectos = data.proyecto;
    });
  }
  // ENVIAR FORM PARA GUARDAR UN NUEVO PROYECTO
  enviar(e: Event) {
    e.preventDefault();

    if (this.form.valid) {
      this.proyectoService.enviarDatos(this.form.value).subscribe((resp) => {
        alert(resp);
        // RECUPERAR DATOS LUEGO DE GUARDAR
        this.proyectoService.obtenerDatos().subscribe((data) => {
          this.persona = data;
          this.proyectos = data.proyecto;
        });
      });
// metodo para limpiar campos de form luego de enviar form
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }
  // ENVIAR FORM PARA MODIFICAR UN PROYECTO
  editarProyecto(e: Event) {
    e.preventDefault();

    if (this.formEditar.valid) {
      this.proyectoService
        .modificarDatos(this.formEditar.value)
        .subscribe((data) => {
          alert('PROYECTO MODIFICADO');
          // RECUPERAR DATOS LUEGO DE MODIFICAR PROYECTO
          this.proyectoService.obtenerDatos().subscribe((data) => {
            this.persona = data;
            this.proyectos = data.proyecto;
          });
        });
    }
  }
  // ELIMINAR UN PROYECTO
  eliminar(id: any) {
    this.proyectoService.eliminarProyecto(id).subscribe((data) => {
      alert(data);
      // RECUPERAR DATOS LUEGO DE ELIMINAR UN PROYECTO
      this.proyectoService.obtenerDatos().subscribe((data) => {
        console.log('Educacion data' + data);
        this.persona = data;
        this.proyectos = data.proyecto;
      });
    });
  }

  cargarModal(proyecto: any) {
    // CARGAR MODAL CON DATOS DE UN PROYECTO PARA MODIFICAR
    this.formEditar.setValue({
      idProyectoEditar: proyecto.idproyecto,
      nombreEditar: proyecto.nombre,
      descripcionEditar: proyecto.descripcion,
      urlEditar: proyecto.url,
    });
  }
}
