import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CotizacionRoutingModule } from './cotizacion-routing.module';
import { CotizacionComponent } from './components/cotizacion/cotizacion.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CotizacionComponent],
  imports: [CommonModule, CotizacionRoutingModule, SharedModule],
})
export class CotizacionModule {}
