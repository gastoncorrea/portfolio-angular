import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AptitudService} from '../../servicios/aptitud.service';

@Component({
  selector: 'app-aptitudes',
  templateUrl: './aptitudes.component.html',
  styleUrls: ['./aptitudes.component.css']
})
export class AptitudesComponent implements OnInit {
  cabecera: any;
  
  form: FormGroup;
  valorNombre:any;
  valorNivel:any;

  constructor(private formBuilder: FormBuilder,
              private aptitudService: AptitudService) {
    this.form = formBuilder.group({
      nombre:['',[Validators.required, Validators.maxLength(50)]],
      nivel:['',[Validators.required]]
    })
   }

   enviar(e:Event){
     e.preventDefault();

     if(this.form.valid){
       console.log('form skill valido');
     }else{
     }
   }

  ngOnInit(): void {
    this.aptitudService.obtenerDatos().subscribe(data => {
      console.log("Educacion data" + data);
      this.cabecera = data.aptitud;
    });
  }

  get Nombre(){
    this.valorNombre = this.form.get('nombre');
    return this.valorNombre;
  }

  get Nivel(){
    this.valorNivel = this.form.get('nivel');
    return this.valorNivel;
  }

}
