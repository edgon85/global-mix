import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CotizacionRoutingModule } from './cotizacion-routing.module';
import { CotizacionComponent } from './components/cotizacion/cotizacion.component';


@NgModule({
  declarations: [CotizacionComponent],
  imports: [
    CommonModule,
    CotizacionRoutingModule
  ]
})
export class CotizacionModule { }
