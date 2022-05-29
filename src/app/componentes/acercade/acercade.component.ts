import { Component, OnInit } from '@angular/core';

import { SobreMiService } from '../../servicios/sobre-mi.service';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css'],
})
export class AcercadeComponent implements OnInit {
  cabecera: any;
  
  constructor(private sobreMiService : SobreMiService) {}

  ngOnInit(): void {
    this.sobreMiService.obtenerDatos().subscribe((data) => {
      console.log(data);
      this.cabecera = data.descripcion_mi;
    });
  
  }
}
