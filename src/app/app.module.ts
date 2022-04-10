import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { AcercadeComponent } from './componentes/acercade/acercade.component';
import { ExperienciaYEducacionComponent } from './componentes/experiencia-y-educacion/experiencia-y-educacion.component';
import { AptitudesComponent } from './componentes/aptitudes/aptitudes.component';
import { LogrosComponent } from './componentes/logros/logros.component';
import { PortfolioService } from './servicios/portfolio.service';
import {HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    NavbarComponent,
    AcercadeComponent,
    ExperienciaYEducacionComponent,
    AptitudesComponent,
    LogrosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [PortfolioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
