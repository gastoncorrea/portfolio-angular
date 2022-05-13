import { Component, OnInit } from '@angular/core'; //importaciones propias de angular

//importaciones propias
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService} from '../../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //Variable de tipo FormGroup
  form: FormGroup;
  contenedorDatosUserName: any;
  contenedorDatosPassword: any;
  
  //Cargar datos iniciales
  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      userName: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(8)]]
    })
    this.form.valueChanges.subscribe((data)=>{
      console.log(data);
      console.log(this.form.get("email"));
    })
   }
   

   mostrarCampos(){
     console.log(this.form.value);
   }

  // login(){
  //   this.authService.login(this.email, this.password)
  // }

  ngOnInit(): void {
  }

  //metodo para obtener el valor que tiene el input email
  get User(){
    this.contenedorDatosUserName =  this.form.get("userName");
    console.log(this.contenedorDatosUserName);
    return this.contenedorDatosUserName;
  }

  get Mail(){
    return this.form.get("email");
  }

  get Password(){
    this.contenedorDatosPassword = this.form.get("password");
    return this.contenedorDatosPassword;
  }

}
