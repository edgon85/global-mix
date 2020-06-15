import { Component, OnInit, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit, AfterViewInit {
  mySwiper: Swiper;

  images: string[] = [
    'assets/images/bg-2.jpg',
    // 'assets/images/bg2-global-1900.jpg',
    'assets/images/bg-1.jpg',
    // 'assets/images/bg_2.jpg'
  ];

  banerData = [
    {
      image: 'assets/images/bg_7.jpg',
      title: '',
      subtitle: '',
    },
    {
      image: 'assets/images/bg_5.jpg',
      title: '',
      subtitle: '',
    },
  ];

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
      },
      autoplay: {
        delay: 9000,
        disableOnInteraction: false,
      },
    });
  }
}
