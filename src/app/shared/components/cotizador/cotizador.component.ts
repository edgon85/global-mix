import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.scss'],
})
export class CotizadorComponent implements OnInit {
  category: boolean = true;
  casas: boolean = false;
  edificios: boolean = false;
  carreteras: boolean = false;
  puentes: boolean = false;
  bodegas: boolean = false;

  subcategory: boolean = false;
  categoria: string = '';
  subcategoria: string = '';

  subCategoryImage: string = '';
  subCategoryName: string = '';

  formData: boolean = false;

  finishCotizar: boolean = false;

  constructor() {}

  ngOnInit() {}

  selectCategory(category: string) {
    switch (category) {
      case 'casas':
        this.categoria = 'casas';
        this.category = false;
        this.casas = true;
        break;
      case 'edificios':
        this.categoria = 'edificios';
        this.category = false;
        this.edificios = true;
        break;
      case 'carreteras':
        this.categoria = 'carreteras';
        this.category = false;
        this.carreteras = true;
        break;
      case 'puentes':
        this.categoria = 'puentes';
        this.category = false;
        this.puentes = true;
        break;
      case 'bodegas':
        this.categoria = 'bodegas';
        this.category = false;
        this.bodegas = true;
        break;
    }

    this.subcategory = false;
    // console.log(`categoria => ${this.categoria}`);
  }

  selectSubcategory(subcategory: string) {
    /*     console.log(`categoria => ${this.categoria}`);
    console.log(`subcategory => ${subcategory}`); */

    const urlImageBase = 'assets/images/icons';

    switch (this.categoria) {
      case 'casas':
        this.casas = false;
        this.subcategory = true;
        this.subcategoria = subcategory;
        this.subCategoryImage = `${urlImageBase}/${this.categoria}/${subcategory}.svg`;
        this.subCategoryName = subcategory;
        break;
      case 'edificios':
        this.edificios = false;
        this.subcategory = true;
        this.subcategoria = subcategory;
        this.subCategoryImage = `${urlImageBase}/${this.categoria}/${subcategory}.svg`;
        if (subcategory === 'losas-terrazas') {
          this.subCategoryName = 'losas o terrazas';
        } else if (subcategory === 'piso-industrial') {
          this.subCategoryName = 'piso industrial';
        } else {
          this.subCategoryName = subcategory;
        }
        break;

      case 'carreteras':
        this.carreteras = false;
        this.subcategory = true;
        this.subcategoria = subcategory;
        this.subCategoryImage = `${urlImageBase}/${this.categoria}/${subcategory}.svg`;
        this.subCategoryName = subcategory;
        break;

      case 'puentes':
        this.puentes = false;
        this.subcategory = true;
        this.subcategoria = subcategory;
        this.subCategoryImage = `${urlImageBase}/${this.categoria}/${subcategory}.svg`;
        this.subCategoryName = subcategory;
        break;

      case 'bodegas':
        this.bodegas = false;
        this.subcategory = true;
        this.subcategoria = 'piso industrial';
        this.subCategoryImage = `${urlImageBase}/${this.categoria}/piso-industrial.svg`;
        this.subCategoryName = subcategory;
        break;
    }

    this.formData = false;
  }

  backMainMenu() {
    this.category = true;
    this.casas = false;
    this.edificios = false;
    this.carreteras = false;
    this.puentes = false;
    this.bodegas = false;
    this.categoria = '';
  }

  showForm() {
    console.log(`categoria => ${this.categoria}`);
    console.log(`sub Categoria => ${this.subcategoria}`);

    this.category = false;
    this.subcategory = false;

    this.formData = true;
  }

  finishQuote() {
    this.category = false;
    this.subcategory = false;
    this.formData = false;

    this.finishCotizar = true;
  }
}
