import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('menu', { static: true }) menu: ElementRef;
  @ViewChild('iconBurger', { static: true }) iconBurger: ElementRef;

  mediaQuery = window.matchMedia('(max-width: 768px)');
  constructor() {}

  ngOnInit() {}

  showHideMenu() {
    if (this.mediaQuery.matches) {
      if (this.menu.nativeElement.classList.contains('drop-menu')) {
        this.menu.nativeElement.classList.remove('drop-menu');
        this.menu.nativeElement.classList.add('menu');
        this.iconBurger.nativeElement.classList.remove('icon-burger-checked');
      } else {
        this.menu.nativeElement.classList.remove('menu');
        this.menu.nativeElement.classList.add('drop-menu');
        this.iconBurger.nativeElement.classList.add('icon-burger-checked');
      }
    }
  }
}
