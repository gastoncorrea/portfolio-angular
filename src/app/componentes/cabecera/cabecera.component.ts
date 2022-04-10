import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../servicios/portfolio.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  constructor(
    private portfolioService:PortfolioService
  ) { }

  ngOnInit(): void {
    this.portfolioService.obtenerDatos();
  }

}
