import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AptitudService } from '../../servicios/aptitud.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-aptitudes',
  templateUrl: './aptitudes.component.html',
  styleUrls: ['./aptitudes.component.css'],
})
export class AptitudesComponent implements OnInit {
  persona: any;
  aptitudes: any;
  // form que contienen los input para agregar y editar Skills
  form: FormGroup;
  formEditar: FormGroup;
  // Editarariables que contienen los estados de los inputs para agregar y editar skills
  valorNombre: any;
  valorNivel: any;
  valorNombreEditar: any;
  valorNivelEditar: any;

  constructor(
    private formBuilder: FormBuilder,
    private aptitudService: AptitudService,
    public authService:AuthService
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      nivel: ['', [Validators.required]],
      persona: formBuilder.group({
        idpersona:['',[]]
      })
    });
    this.formEditar = formBuilder.group({
      idAptitudEditar:['',[]],
      nombreEditar: ['', [Validators.required, Validators.maxLength(50)]],
      nivelEditar: ['', [Validators.required]],
    });
  }
  get Nombre() {
    this.valorNombre = this.form.get('nombre');
    return this.valorNombre;
  }

  get Nivel() {
    this.valorNivel = this.form.get('nivel');
    return this.valorNivel;
  }
  get NombreEditar() {
    this.valorNombreEditar = this.form.get('nombreEditar');
    return this.valorNombreEditar;
  }

  get NivelEditar() {
    this.valorNivelEditar = this.form.get('nivelEditar');
    return this.valorNivelEditar;
  }

  ngOnInit(): void {
    // funcion que trae los datos del servidor
    this.aptitudService.obtenerDatos().subscribe((data) => {
      this.persona = data;
      this.aptitudes = data.aptitud;
    });
  }

  enviar(e: Event) {

    e.preventDefault();

    if (this.form.valid) {
      // FUNCION QUE GUARDA DATOS EN BASE DE DATOS APTITUD
      this.aptitudService.enviarDatos(this.form.value).subscribe(resp=>{
        alert(resp);

        this.aptitudService.obtenerDatos().subscribe((data) => {
          this.persona = data;
          this.aptitudes = data.aptitud;
        });
      })
    } else {
    }
  }

  cargarDatosModal(skill:any){
    // CARGA EL MODAL CON LOS DATOS DE UNA APTITUD
    this.formEditar.setValue({
      idAptitudEditar:skill.id,
      nombreEditar:skill.nombre,
      nivelEditar:skill.nivel
    })
  }

  enviarFormEditar(e:Event){
    e.preventDefault();

    if(this.formEditar.valid){
      // ENVIA EL FORM AL SERVICIO PARA GUARDAR EN BASE DE DATOS
      this.aptitudService.modificarDatos(this.formEditar.value).subscribe(resp=>{
        alert("Usuario Modificado: ");

        this.aptitudService.obtenerDatos().subscribe((data) => {
          this.persona = data;
          this.aptitudes = data.aptitud;
        });
      })
    }else{
      this.formEditar.markAllAsTouched();
    }
  }

  eliminar(id:any) {
    // ELIMINAR UNA APTITUD
    this.aptitudService.eliminarAptitud(id).subscribe(resp=>{
      alert(resp);

      this.aptitudService.obtenerDatos().subscribe((data) => {
        
        this.persona = data;
        this.aptitudes = data.aptitud;
      });
    })
  }
}
