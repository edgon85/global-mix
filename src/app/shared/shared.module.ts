import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { BannerComponent } from './components/banner/banner.component';

@NgModule({
  declarations: [HeaderComponent, BannerComponent],
  imports: [RouterModule, CommonModule],
  exports: [HeaderComponent, BannerComponent],
})
export class SharedModule {}
