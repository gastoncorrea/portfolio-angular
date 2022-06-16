import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() disparadorCredenciales: EventEmitter<any> = new EventEmitter();

  //api = "curriculum/persona";
  // api = "http://localhost:8080/";
  api = " https://stormy-harbor-23738.herokuapp.com/";
  currentUserSubject : BehaviorSubject<any>;
  usuarioInvitado:boolean = true; 

  constructor(private http: HttpClient, private router: Router) {
    console.log("El servicio de autenticacion esta corriendo");
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')|| '{}'));
   }

  login(credenciales:any):Observable<any>{
    // guardo email de usuario registrado para luego usar sus datos desde la api
    sessionStorage.setItem('usuario',JSON.stringify(credenciales.email));

      return this.http.post(this.api +"autenticacion/persona", credenciales,{responseType:'text'}).pipe(map(data=>{
        sessionStorage.setItem('currentUser', JSON.stringify(data));   
        this.currentUserSubject.next(data);
        console.log("DATA:" + data);
        console.log(this.usuarioInvitado);
        return data;
      }))
  }

  loginInvitado():Observable<any> {
    sessionStorage.setItem('usuario',JSON.stringify("gaston@gmail.com"));
   return this.http.get(this.api + "login/invitado",{responseType:'text'}).pipe(map(data=>{
    sessionStorage.setItem('currentUser', JSON.stringify(data));   
    this.currentUserSubject.next(data);
    console.log("DATA:" + data);
    return data;
   }));
  }

  //cerrar sesion borro token del localstorage
  logOut(){
    localStorage.removeItem('auth_token');
  }

  //consultar si hay alguna sesion iniciada
  public get logIn(): boolean{
    return (localStorage.getItem('auth_token') !== null);
  }

  get UserAutenticado(){
    return this.currentUserSubject.value;
  }

  get Usuario(){
    return this.usuarioInvitado;
  }

}
