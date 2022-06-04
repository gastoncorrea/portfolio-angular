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
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onEnviar(e: Event) {
    e.preventDefault;
    if (this.form.valid) {
      console.log('El boton submit del formulario funciona');
      //MANDAR DATOS VALIDADOS DESDE EL FORM AL BACKEND
      this.authService.login(this.form.value).subscribe((data) => {
        console.log('DATA:' + JSON.stringify(data));
      });
      this.router.navigate(['/inicio']);
    } else {
      this.form.markAllAsTouched();
    }
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
