import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  persona:any;
  
  url: String = 'http://localhost:8080/';
  

  constructor(private http: HttpClient, private auth: AuthService) {}

  obtenerDatos(email:any): Observable<any> {
    console.log('*****' + email);
    return this.http.get(this.url + 'curriculum/persona/' + email).pipe(map((data)=>{
      this.persona = JSON.stringify(data);

      console.log("NUEVO TIPO DE DATOS CON USUARIO");
      console.log(data);
      return data;
    }));
  }


  modificarPersona(persona: any, id: number): Observable<any> {
    console.log('NOMBRE' + persona.nombreEditar);
    return this.http.put(
      this.url +
        `persona/modificar/${id}?imagen_perfil=${persona.imagen_perfilEditar}&descripcion_mi=${null}&url_linkedin=${persona.url_linkedinEditar}&nombre=${persona.nombreEditar}&apellido=${persona.apellidoEditar}&num_celular=${persona.num_celularEditar}`,
        {}
    );
  }
}
