import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectosRoutingModule } from './proyectos-routing.module';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ProyectDetailComponent } from './components/proyect-detail/proyect-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ProyectosComponent, ProyectDetailComponent],
  imports: [CommonModule, ProyectosRoutingModule, SharedModule],
})
export class ProyectosModule {}
