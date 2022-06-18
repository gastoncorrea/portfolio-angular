import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AptitudService {
  url: String = 'https://stormy-harbor-23738.herokuapp.com/';
  // traigo mail del usuario logueado que esta guardado en session storage
  email = JSON.parse(sessionStorage.getItem('usuario')|| '');
  constructor(private http: HttpClient, private auth: AuthService) {}

  obtenerDatos(): Observable<any> {
    return this.http.get(this.url + 'curriculum/persona/' + this.email);
  }

  enviarDatos(aptitud:any):Observable<any>{
    return this.http.post(this.url + 'aptitud/agregar',aptitud,{responseType:'text'});
  }

  modificarDatos(aptitud: any):Observable<any>{
    return this.http.put(this.url + "aptitud/modificar/"+aptitud.idAptitudEditar + `?nombre=${aptitud.nombreEditar}&nivel=${(aptitud.nivelEditar)}`, {});
  }

  eliminarAptitud(id:any):Observable<any>{
    return this.http.delete(this.url + "aptitud/borrar/"+id,{responseType:'text'});
  }
}
