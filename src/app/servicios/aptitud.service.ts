import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AptitudService {
  url: String = 'http://localhost:8080/';
  email = this.auth.UsuarioLogueado;
  constructor(private http: HttpClient, private auth: AuthService) {}

  obtenerDatos(): Observable<any> {
    console.log('*****Apttud' + this.email);
    return this.http.get(this.url + 'curriculum/persona/' + this.email);
  }

  enviarDatos(aptitud:any):Observable<any>{
    return this.http.post(this.url + 'aptitud/agregar',aptitud,{responseType:'text'});
  }

  modificarDatos(aptitud: any):Observable<any>{
    return this.http.put(this.url + "aptitud/modificar/"+aptitud.idAptitudEditar + `?nombre=${aptitud.nombreEditar}&nivel=${(aptitud.nivelEditar)}`, {});
  }
}
