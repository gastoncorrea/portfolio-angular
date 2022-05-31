import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  

  url: String = 'http://localhost:8080/';
  email = this.auth.UsuarioLogueado;

  constructor(private http: HttpClient, private auth: AuthService) {}

  obtenerDatos(): Observable<any> {
    console.log('*****' + this.email);
    return this.http.get(this.url + 'curriculum/persona/' + this.email);
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
