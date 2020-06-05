import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { BannerComponent } from './components/banner/banner.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, BannerComponent, FooterComponent],
  imports: [RouterModule, CommonModule],
  exports: [HeaderComponent, BannerComponent, FooterComponent],
})
export class SharedModule {}
