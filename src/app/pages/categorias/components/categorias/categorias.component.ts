import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements OnInit {
  resistencia: boolean = false;
  pavimentos: boolean = false;
  premesclado: boolean = false;
  general: boolean = false;
  vivienda: boolean = false;

  @ViewChild('eyelash1', { static: true }) eyelash1: ElementRef;
  @ViewChild('eyelash2', { static: true }) eyelash2: ElementRef;
  @ViewChild('eyelash3', { static: true }) eyelash3: ElementRef;
  @ViewChild('eyelash4', { static: true }) eyelash4: ElementRef;
  @ViewChild('eyelash5', { static: true }) eyelash5: ElementRef;

  constructor() {}

  ngOnInit() {
    this.eyelash1.nativeElement.classList.add('textBlack');
    this.resistencia = true;
  }

  selectEyelash1() {
    this.resistencia = true;
    this.pavimentos = false;
    this.premesclado = false;
    this.general = false;
    this.vivienda = false;
    this.eyelash1.nativeElement.classList.add('textBlack');
    this.eyelash2.nativeElement.classList.remove('textBlack');
    this.eyelash3.nativeElement.classList.remove('textBlack');
    this.eyelash4.nativeElement.classList.remove('textBlack');
    this.eyelash5.nativeElement.classList.remove('textBlack');
  }
  selectEyelash2() {
    this.resistencia = false;
    this.pavimentos = true;
    this.premesclado = false;
    this.general = false;
    this.vivienda = false;
    this.eyelash1.nativeElement.classList.remove('textBlack');
    this.eyelash2.nativeElement.classList.add('textBlack');
    this.eyelash3.nativeElement.classList.remove('textBlack');
    this.eyelash4.nativeElement.classList.remove('textBlack');
    this.eyelash5.nativeElement.classList.remove('textBlack');
  }
  selectEyelash3() {
    this.resistencia = false;
    this.pavimentos = false;
    this.premesclado = true;
    this.general = false;
    this.vivienda = false;
    this.eyelash1.nativeElement.classList.remove('textBlack');
    this.eyelash2.nativeElement.classList.remove('textBlack');
    this.eyelash3.nativeElement.classList.add('textBlack');
    this.eyelash4.nativeElement.classList.remove('textBlack');
    this.eyelash5.nativeElement.classList.remove('textBlack');
  }
  selectEyelash4() {
    this.resistencia = false;
    this.pavimentos = false;
    this.premesclado = false;
    this.general = true;
    this.vivienda = false;
    this.eyelash1.nativeElement.classList.remove('textBlack');
    this.eyelash2.nativeElement.classList.remove('textBlack');
    this.eyelash3.nativeElement.classList.remove('textBlack');
    this.eyelash4.nativeElement.classList.add('textBlack');
    this.eyelash5.nativeElement.classList.remove('textBlack');
  }
  selectEyelash5() {
    this.resistencia = false;
    this.pavimentos = false;
    this.premesclado = false;
    this.general = false;
    this.vivienda = true;
    this.eyelash1.nativeElement.classList.remove('textBlack');
    this.eyelash2.nativeElement.classList.remove('textBlack');
    this.eyelash3.nativeElement.classList.remove('textBlack');
    this.eyelash4.nativeElement.classList.remove('textBlack');
    this.eyelash5.nativeElement.classList.add('textBlack');
  }
}
