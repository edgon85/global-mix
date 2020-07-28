import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { BannerComponent } from './components/banner/banner.component';
import { FooterComponent } from './components/footer/footer.component';
import { CotizadorComponent } from './components/cotizador/cotizador.component';
import { VideoBackgroundComponent } from './components/video-background/video-background.component';
import { WhatsappComponent } from './components/whatsapp/whatsapp.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BannerComponent,
    FooterComponent,
    CotizadorComponent,
    VideoBackgroundComponent,
    WhatsappComponent,
  ],
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    HeaderComponent,
    BannerComponent,
    FooterComponent,
    CotizadorComponent,
    VideoBackgroundComponent,
    WhatsappComponent,
  ],
})
export class SharedModule {}
