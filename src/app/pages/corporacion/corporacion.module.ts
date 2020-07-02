import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporacionRoutingModule } from './corporacion-routing.module';
import { CorporacionComponent } from './components/corporacion/corporacion.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CorporacionComponent],
  imports: [CommonModule, CorporacionRoutingModule, SharedModule],
})
export class CorporacionModule {}
