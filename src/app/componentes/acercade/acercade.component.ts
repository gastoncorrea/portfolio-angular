import { Component, OnInit } from '@angular/core';

import { SobreMiService } from '../../servicios/sobre-mi.service';
import {AuthService} from '../../servicios/auth.service';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css'],
})
export class AcercadeComponent implements OnInit {
  descripcion_mi: any;

  idPersona : any;
  nombrePersona : any;
  apellidoPersona : any;
  num_celular : any;
  imagen_perfil : any;
  url_linkedin : any;
  // contiene datos de la persona logueda



  

  constructor(private sobreMiService : SobreMiService,
              public authService:AuthService) {}

  enviar(cabe:any){

    this.sobreMiService.modificarPersona(cabe,this.idPersona,this.nombrePersona,this.apellidoPersona,
      this.num_celular,this.imagen_perfil,this.url_linkedin).subscribe(data=>{
      alert("Usuario Modificado correctamente");

      this.sobreMiService.obtenerDatos().subscribe(data => {
        console.log("DATOS PERSONA SOBRE MI: "+data);
        this.idPersona = data.idPersona;
        this.nombrePersona = data.nombrePersona;
        this.apellidoPersona = data.apellidoPersona;
        this.num_celular = data.num_celular;
        this.imagen_perfil = data.imagen_perfil;
        this.url_linkedin = data.url_linkedin;
        this.descripcion_mi = data.descripcion_mi;
      });
    })
  }  

  ngOnInit(): void {
    this.sobreMiService.obtenerDatos().subscribe(data => {
      console.log("DATOS PERSONA SOBRE MI: "+data);
      this.idPersona = data.idPersona;
      this.nombrePersona = data.nombrePersona;
      this.apellidoPersona = data.apellidoPersona;
      this.num_celular = data.num_celular;
      this.imagen_perfil = data.imagen_perfil;
      this.url_linkedin = data.url_linkedin;
      this.descripcion_mi = data.descripcion_mi;
    });
  
  }
}
