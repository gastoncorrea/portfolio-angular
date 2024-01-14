import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { PortfolioService } from './portfolio.service';

@Injectable({
  providedIn: 'root',
})
export class SobreMiService {
  // URL PARA CONECTAR CON SERVIDOR
  url: String = 'https://portfolio-web-ijdn.onrender.com';
  // traigo mail del usuario logueado que esta guardado en session storage
  email = JSON.parse(sessionStorage.getItem('usuario')|| '');

  constructor(
    private http: HttpClient,
  ) {}

  obtenerDatos(): Observable<any> {
    
    return this.http.get(this.url + 'curriculum/persona/' + this.email);
  }

  modificarPersona(descripcion: any, id:any, nombre:any, apellido:any, celular:any,imagen:any,url:any ): Observable<any> {
    
    return this.http.put(
      this.url +
        `persona/modificar/${id}?imagen_perfil=${imagen}&descripcion_mi=${descripcion}&url_linkedin=${url}&nombre=${nombre}&apellido=${apellido}&num_celular=${celular}`,
      {},{responseType:'json'}
    );
  }
}
