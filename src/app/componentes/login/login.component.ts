import { Component, OnInit } from '@angular/core'; //importaciones propias de angular

//importaciones propias
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //Variable de tipo FormGroup
  form: FormGroup;

  //Variable que contiene el valor del input password
  contenedorDatosPassword: any;

  //Cargar datos iniciales
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // FORM PARA AUTORIZAR ACCESO
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  // FUNCION PARA ENVIAR FORM PARA AUTENTICACION AL SERVIDOR
  onEnviar(e: Event) {
    e.preventDefault;
    if (this.form.valid) {
      //MANDAR DATOS VALIDADOS DESDE EL FORM AL BACKEND
      this.authService.login(this.form.value).subscribe((data) => {
        if (data == 'FAIL') {
          this.router.navigate(['/login']);
          alert('El usuario no existe');
        } else {
          this.router.navigate(['/inicio']);
          this.authService.usuarioInvitado = false;
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
  // FUNCION PARA INGRESAR COMO INVITADO
  invitado() {
    this.authService.loginInvitado().subscribe((data) => {
      this.authService.usuarioInvitado = true;
    });
    this.authService.Usuario;
    this.router.navigate(['/inicio']);
  }

  ngOnInit(): void {}

  //metodo para obtener el valor que tiene el input userName,email y password

  get Mail() {
    return this.form.get('email');
  }

  get Password() {
    this.contenedorDatosPassword = this.form.get('password');
    return this.contenedorDatosPassword;
  }
}
