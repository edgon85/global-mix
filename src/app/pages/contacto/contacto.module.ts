import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactoRoutingModule } from './contacto-routing.module';
import { ContactoComponent } from './components/contacto/contacto.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ContactoComponent],
  imports: [CommonModule, ContactoRoutingModule, SharedModule],
})
export class ContactoModule {}
