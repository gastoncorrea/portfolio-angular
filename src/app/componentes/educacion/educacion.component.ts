import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EducacionService } from '../../servicios/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css'],
})
export class EducacionComponent implements OnInit {
  persona: any;
  listaEducacion:any;
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
    private educacionService: EducacionService
  ) {
    this.form = formBuilder.group({
      nombre_institucion: ['', [Validators.required, Validators.maxLength(50)]],
      logo: ['', [Validators.maxLength(200)]],
      fecha_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      titulo: ['', [Validators.required, Validators.maxLength(50)]],
      persona: this.formBuilder.group({
        idpersona:['',[]]
      })
    });

    this.formEditar = formBuilder.group({
      nombre_institucionEditar: [
        '',
        [Validators.required, Validators.maxLength(50)],
      ],
      logoEditar: ['', [Validators.maxLength(50)]],
      fecha_inicioEditar: ['', [Validators.required]],
      fecha_finEditar: ['', [Validators.required]],
      tituloEditar: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }
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
    this.valorNombreEditar = this.form.get('nombre_institucionEditar');
    return this.valorNombreEditar;
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

  get TituloEditar() {
    this.valorTituloEditar = this.form.get('tituloEditar');
    return this.valorTituloEditar;
  }
  
  ngOnInit(): void {
    this.educacionService.obtenerDatos().subscribe((data) => {
      console.log('Educacion data' + data);
      this.persona = data;
      this.listaEducacion = data.educacion;
    });
  }

  enviar(e: Event) {
    e.preventDefault();
    if (this.form.valid) {
      console.log('form educacion valido');
      console.log(this.form.value);
      this.educacionService.guardarNuevaEducacion(this.form.value).subscribe( data =>{
        alert(data);
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

}
