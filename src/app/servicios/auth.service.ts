import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = "http://localhost:8080/autenticacion";
  token: any;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string){
    this.http.post(this.api,{email: email, password: password}).subscribe((resp:any)=>{
      //redireccionamos al usuario al perfil de login
      this.router.navigate(["perfil"]);
      //guardamos el token en el localstorage
      localStorage.setItem('auth_token', resp.token);
    })
  }

  //cerrar sesion borro token del localstorage
  logOut(){
    localStorage.removeItem('auth_token');
  }

  //consultar si hay alguna sesion iniciada
  public get logIn(): boolean{
    return (localStorage.getItem('auth_token') !== null);
  }
}
