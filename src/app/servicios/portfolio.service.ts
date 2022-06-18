import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  // traigo mail del usuario logueado que esta guardado en session storage
  email = JSON.parse(sessionStorage.getItem('usuario')|| '');
  
  // url: String = 'http://localhost:8080/';
  url: String = ' https://stormy-harbor-23738.herokuapp.com/';
  

  constructor(private http: HttpClient, private auth: AuthService) {}

  obtenerDatos(): Observable<any> {
    return this.http.get(this.url + 'curriculum/persona/' + this.email).pipe(map((data)=>{
      return data;
    }));
  }


  modificarPersona(persona: any): Observable<any> {
    
    return this.http.put(
      this.url +
        `persona/modificar/${persona.idPersonaEditar}?imagen_perfil=${persona.imagen_perfilEditar}&descripcion_mi=${persona.descripcionEditar}&url_linkedin=${persona.url_linkedinEditar}&nombre=${persona.nombreEditar}&apellido=${persona.apellidoEditar}&num_celular=${persona.num_celularEditar}`,
        {}
    );
  }

  modificarResidencia(residencia: any):Observable<any>{
    
    return this.http.put(this.url + `residencia/modificar/${residencia.idResidenciaEditar}?direccion=${residencia.direccionEditar}&localidad=${residencia.localidadEditar}&provincia=${residencia.provinciaEditar}&pais=${residencia.paisEditar}&nacionalidad=${residencia.nacionalidadEditar}`,{});
  }
}
