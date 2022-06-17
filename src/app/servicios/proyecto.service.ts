import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  url: String = 'https://stormy-harbor-23738.herokuapp.com/';
  // traigo mail del usuario logueado que esta guardado en session storage
  email = JSON.parse(sessionStorage.getItem('usuario')|| '');
  constructor(private http: HttpClient, private auth: AuthService) {}

  obtenerDatos(): Observable<any> {
    console.log('*****Apttud' + this.email);
    return this.http.get(this.url + 'curriculum/persona/' + this.email);
  }

  enviarDatos(proyecto:any):Observable<any>{
    return this.http.post(this.url + "proyecto/crear", proyecto,{responseType:'text'})
  }

  modificarDatos(proyecto:any):Observable<any>{
    return this.http.put(this.url + "proyecto/modificar/" + `${proyecto.idProyectoEditar}?nombre=${proyecto.nombreEditar}&descripcion=${proyecto.descripcionEditar}&url=${proyecto.urlEditar}`,{},{responseType:'json'})
  }

  eliminarProyecto(id:any):Observable<any>{
    return this.http.delete(this.url+"proyecto/eliminar/"+ id,{responseType:'text'});
  }
}
