import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporacionComponent } from './components/corporacion/corporacion.component';

const routes: Routes = [
  {
    path: '',
    component: CorporacionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorporacionRoutingModule {}
