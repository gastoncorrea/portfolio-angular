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
  persona: any;
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
    public authService:AuthService
  ) {
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

    this.formEditar = formBuilder.group({
      idEducacionEditar: ['', []],
      nombre_institucionEditar: ['',[Validators.required, Validators.maxLength(50)]],
      logoEditar: ['', [Validators.maxLength(200)]],
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
    this.educacionService.obtenerDatos().subscribe((data) => {
      console.log('Educacion data' + data);
      console.log("DATOS QUE LLEGAN DE SERVIDOR EDUCACION ");
      console.log(data.educacion);
      this.persona = data;
      this.listaEducacion = data.educacion;
    });
  }

  enviar(e: Event) {
    e.preventDefault();
    if (this.form.valid) {
      console.log('form educacion valido');
      console.log(this.form.value);
      this.educacionService
        .guardarNuevaEducacion(this.form.value)
        .subscribe((data) => {
          alert(data);

          this.educacionService.obtenerDatos().subscribe((data) => {
            console.log('Educacion data' + data);
            console.log("DATOS QUE LLEGAN DE SERVIDOR EDUCACION ");
            console.log(data.educacion);
            this.persona = data;
            this.listaEducacion = data.educacion;
          });
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  enviarModificar(e:Event){
    e.preventDefault;
    console.log("ENVIANDO FORM PARA EDITAR CON ESTOS DATOS: ")
    console.log(this.formEditar.value);
    if(this.formEditar.valid){
      this.educacionService.modificarEducacion(this.formEditar.value).subscribe(data => {
        console.log("VALOR MODIFICADO DE EDUCACION: ");
        alert("EDUCACION MODIFICADA CON EXITO"+JSON.stringify(data));

        this.educacionService.obtenerDatos().subscribe((data) => {
          console.log('Educacion data' + data);
          console.log("DATOS QUE LLEGAN DE SERVIDOR EDUCACION ");
          console.log(data.educacion);
          this.persona = data;
          this.listaEducacion = data.educacion;
        });
      });
      
    }else{
      this.formEditar.markAllAsTouched();
    }
  }

  cargarDatosModal(cabe:any){

    this.formEditar.setValue({
      idEducacionEditar:cabe.ideducacion,
      nombre_institucionEditar:cabe.nombre_institucion,
      logoEditar:cabe.logo,
      fecha_inicioEditar:cabe.fecha_inicio,
      fecha_finEditar:cabe.fecha_fin,
      tituloEditar:cabe.titulo
    })
    console.log("VALOR DEL FORMULARIO CUANDO SE CARGAN AL PRESIONAR LAPIZ: ");
    console.log(this.formEditar.value);
  }

  eliminar(id:any){
    this.educacionService.eliminarEducacion(id).subscribe(data=>{
      alert(data);

      this.educacionService.obtenerDatos().subscribe((data) => {
        console.log('Educacion data' + data);
        console.log("DATOS QUE LLEGAN DE SERVIDOR EDUCACION ");
        console.log(data.educacion);
        this.persona = data;
        this.listaEducacion = data.educacion;
      });
    })
    
  }
}
