import { Component, OnInit } from '@angular/core';

import { PortfolioService } from '../../servicios/portfolio.service';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css'],
})
export class AcercadeComponent implements OnInit {
  cabecera: any;
  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.obtenerDatos().subscribe((data) => {
      console.log(data);
      this.cabecera = data;
    });
  }
}
