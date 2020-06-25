import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ProyectDetailComponent } from './components/proyect-detail/proyect-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ProyectosComponent,
  },
  {
    path: ':id',
    component: ProyectDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProyectosRoutingModule {}
