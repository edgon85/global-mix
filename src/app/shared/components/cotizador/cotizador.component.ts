import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Departamento,
  UserData,
} from '../../../interfaces/departamentos.interface';
import { Router } from '@angular/router';

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
  metros3: number = 0;

  formularioData: boolean = false;

  finishCotizar: boolean = false;

  formaMtsCubicos: FormGroup;
  formaUserData: FormGroup;

  @ViewChild('step1', { static: true }) step1: ElementRef;
  @ViewChild('step2', { static: true }) step2: ElementRef;
  @ViewChild('step3', { static: true }) step3: ElementRef;
  @ViewChild('line1', { static: true }) line1: ElementRef;
  @ViewChild('line2', { static: true }) line2: ElementRef;
  @ViewChild('line3', { static: true }) line3: ElementRef;

  datos: object = {
    categoria: '',
    subcaegoria: '',
    nombre: '',
    telefono: '',
    departamento: '',
    correo: '',
  };

  public departamento = Object.keys(Departamento).map((key) => ({
    label: key,
    key: Departamento[key],
  }));

  constructor(private fb: FormBuilder, private router: Router) {
    this.inputMtsCubicos();
    this.formUserData();
  }

  ngOnInit() {
    this.step2.nativeElement.classList.add('img-truck');
    this.step3.nativeElement.classList.add('img-truck');

    this.formaUserData.reset({
      nombre: '',
      correo: '',
      telefono: '',
      departamento: Departamento.quetzaltenango,
    });
  }

  /* ===================================== */
  /* Seleccionar categoria */
  /* ===================================== */
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

  /* ===================================== */
  /* Seleccionar sub categoria */
  /* ===================================== */
  selectSubcategory(subcategory: string) {
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

    this.formularioData = false;
    this.step1.nativeElement.classList.remove('img-truck');
    this.step2.nativeElement.classList.add('img-truck');
    this.line2.nativeElement.classList.remove('change-line');
  }

  /* ===================================== */
  /* boton para regresar a categorias*/
  /* ===================================== */
  buttonBackMainMenu() {
    this.category = true;
    this.casas = false;
    this.edificios = false;
    this.carreteras = false;
    this.puentes = false;
    this.bodegas = false;
    this.finishCotizar = false;
    this.categoria = '';
  }

  /* ===================================== */
  /* boton para regresar a categorias*/
  /* ===================================== */
  buttonShowForm() {
    if (this.formaMtsCubicos.invalid) {
      return Object.values(this.formaMtsCubicos.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((resp) =>
            resp.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }

    if (this.formaMtsCubicos.valid) {
      // this.element.nativeElement.classList.add("newclass");
      // this.element.nativeElement.classList.remove("newclass")
      this.step1.nativeElement.classList.add('img-truck');
      this.step2.nativeElement.classList.remove('img-truck');
      this.line2.nativeElement.classList.add('change-line');

      this.category = false;
      this.subcategory = false;
      this.formularioData = true;

      this.metros3 = this.formaMtsCubicos.value.metrosCubicos;
    }
  }

  /* ===================================== */
  /* boton para finalizar*/
  /* ===================================== */
  buttonFinishQuote() {
    if (this.formaUserData.invalid) {
      return Object.values(this.formaUserData.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((resp) =>
            resp.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }

    if (this.formaUserData.valid) {
      this.step2.nativeElement.classList.add('img-truck');
      this.step3.nativeElement.classList.remove('img-truck');
      this.line3.nativeElement.classList.add('change-line');

      this.category = false;
      this.subcategory = false;
      this.formularioData = false;
      this.finishCotizar = true;

      const data: UserData = {
        categoria: this.categoria,
        subcaegoria: this.subcategoria,
        nombre: this.formaUserData.value.nombre,
        telefono: this.formaUserData.value.telefono,
        departamento: this.formaUserData.value.departamento,
        correo: this.formaUserData.value.correo,
      };
      console.log(data);
    }
  }

  // <=================================================================> //
  // Formulario de metros cubicos
  // <=================================================================> //
  inputMtsCubicos() {
    this.formaMtsCubicos = this.fb.group({
      metrosCubicos: ['', Validators.required],
    });
  }
  // <=================================================================> //

  // <=================================================================> //
  // Formulario de datos de usuario
  // <=================================================================> //
  formUserData() {
    this.formaUserData = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      departamento: ['', Validators.required],
      correo: [''],
    });
  }
  // <=================================================================> //

  // <=================================================================> //
  // <Validaciones> //
  // <=================================================================> //
  validarCampo(nombre: string) {
    return (
      this.formaMtsCubicos.get(nombre).invalid &&
      this.formaMtsCubicos.get(nombre).touched
    );
  }
  validarCampoUser(nombre: string) {
    return (
      this.formaUserData.get(nombre).invalid &&
      this.formaUserData.get(nombre).touched
    );
  }
  // <=================================================================> //

  // <=================================================================> //
  // Seguir explorando //
  // <=================================================================> //

  seguirExplorando() {
    this.buttonBackMainMenu();

    this.step1.nativeElement.classList.remove('img-truck');
    this.step2.nativeElement.classList.add('img-truck');
    this.step3.nativeElement.classList.add('img-truck');
    this.line1.nativeElement.classList.add('change-line');
    this.line2.nativeElement.classList.remove('change-line');
    this.line3.nativeElement.classList.remove('change-line');

    this.formaMtsCubicos.reset({
      metrosCubicos: '',
    });

    this.formaUserData.reset({
      nombre: '',
      correo: '',
      telefono: '',
      departamento: Departamento.quetzaltenango,
    });

    this.router.navigateByUrl('/inicio');
  }
}
