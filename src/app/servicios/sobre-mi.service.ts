import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { PortfolioService } from './portfolio.service';

@Injectable({
  providedIn: 'root',
})
export class SobreMiService {
  // id Usuario logueado
  personaEncontrada:any;

  url: String = 'http://localhost:8080/';
  email = this.auth.UsuarioLogueado;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private portfolioService: PortfolioService
  ) {}

  obtenerDatos(): Observable<any> {
    console.log('*****' + this.email);
    return this.http.get(this.url + 'curriculum/persona/' + this.email);
  }

  modificarPersona(descripcion: any, id:any, nombre:any, apellido:any, celular:any,imagen:any,url:any ): Observable<any> {
    console.log('NOMBRE SOBRE MI: ' + descripcion);
    return this.http.put(
      this.url +
        `persona/modificar/${id}?imagen_perfil=${imagen}&descripcion_mi=${descripcion}&url_linkedin=${url}&nombre=${nombre}&apellido=${apellido}&num_celular=${celular}`,
      {}
    );
  }
}
