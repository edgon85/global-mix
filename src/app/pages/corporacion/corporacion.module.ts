import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporacionRoutingModule } from './corporacion-routing.module';
import { CorporacionComponent } from './components/corporacion/corporacion.component';


@NgModule({
  declarations: [CorporacionComponent],
  imports: [
    CommonModule,
    CorporacionRoutingModule
  ]
})
export class CorporacionModule { }
