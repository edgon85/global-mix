import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import {
  Departamento,
  UserData,
} from '../../../interfaces/departamentos.interface';
import { Router } from '@angular/router';

import {
  AngularFirestoreCollection,
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
  /*   @ViewChild('line1', { static: true }) line1: ElementRef;*/
  @ViewChild('borderBottom2', { static: true }) borderBottom2: ElementRef;
  @ViewChild('borderBottom3', { static: true }) borderBottom3: ElementRef;

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

  item: Observable<UserData>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private afs: AngularFirestore
  ) {
    this.inputMtsCubicos();
    this.formUserData();
  }

  ngOnInit() {
    this.step2.nativeElement.classList.add('display-none');
    this.step3.nativeElement.classList.add('display-none');

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
    this.step1.nativeElement.classList.remove('display-none');
    this.step2.nativeElement.classList.add('display-none');
    this.borderBottom2.nativeElement.classList.remove('border-blue');

    this.formaMtsCubicos.reset({
      metrosCubicos: '',
    });
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
  /* Paso siguiente al formulario */
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
      this.step1.nativeElement.classList.add('display-none');
      this.borderBottom2.nativeElement.classList.add('border-blue');
      this.step2.nativeElement.classList.remove('display-none');
      // this.line2.nativeElement.classList.add('change-line');

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
      this.step2.nativeElement.classList.add('display-none');
      this.step3.nativeElement.classList.remove('display-none');
      this.borderBottom3.nativeElement.classList.add('border-blue');

      this.category = false;
      this.subcategory = false;
      this.formularioData = false;
      this.finishCotizar = true;

      const htmlData = `
      <section style="padding: 20px">

        <p>Solicitud de cotizacion</p>

        <p>
        deseo emprender un proyecto de <strong>${
          this.categoria
        }</strong> para fundir <strong>${
        this.metros3
      } metros cúbicos</strong> de <strong>${this.subcategoria}</strong>
        </p>

        <table style="width: 500px; border-collapse: collapse;">
          <thead>
            <tr style="background: black; color: #fff; text-align: left;">
              <th style="font-size: 16px;">Datos de contacto</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nombre</td>
              <td style="text-align: right;">${
                this.formaUserData.value.nombre
              }</td>
            </tr>
            <tr>
              <td>Teléfono</td>
              <td style="text-align: right;">+502 ${
                this.formaUserData.value.telefono
              }</td>
            </tr>
            <tr>
              <td>Correo</td>
              <td style="text-align: right;">${this.formaUserData.value.correo.toLowerCase()}</td>
            </tr>
            <tr>
              <td>Departamento</td>
              <td style="text-align: right;">${
                this.formaUserData.value.departamento
              }</td>
            </tr>
          </tbody>
        </table>
        <br><br>
        <table style="width: 500px; border-collapse: collapse;">
          <thead>
            <tr style="background: black; color: #fff; text-align: left;">
              <th style="font-size: 16px;">Detalles de fundición</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Construcción</td>
              <td style="text-align: right;">${this.categoria}</td>
            </tr>
            <tr>
              <td>Tipo</td>
              <td style="text-align: right;">${this.subcategoria}</td>
            </tr>
            <tr>
              <td>Metros cúbicos</td>
              <td style="text-align: right;">${this.metros3}</td>
            </tr>
          </tbody>
        </table>
      </section>
      `;

      const htmlDataUser = `
      <section style="padding: 20px 10px">
        <p>Estimado(a) ${this.formaUserData.value.nombre}</p>
        <p>Gracias por comunicarse con Global Mix para cotizar su proyecto de fundición.</p>
        <p>En unos momentos nuestro equipo de asesores se estara comunicando con usted.</p>

        <p>Información solicitada: </p>
        <table style="width: 500px; border-collapse: collapse;">
          <thead>
            <tr style="background: black; color: #fff; text-align: left;">
              <th style="font-size: 16px;">Datos de contacto</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nombre</td>
              <td style="text-align: right;">${
                this.formaUserData.value.nombre
              }</td>
            </tr>
            <tr>
              <td>Teléfono</td>
              <td style="text-align: right;">+502 ${
                this.formaUserData.value.telefono
              }</td>
            </tr>
            <tr>
              <td>Correo</td>
              <td style="text-align: right;">${this.formaUserData.value.correo.toLowerCase()}</td>
            </tr>
            <tr>
              <td>Departamento</td>
              <td style="text-align: right;">${
                this.formaUserData.value.departamento
              }</td>
            </tr>
          </tbody>
        </table>
        <br><br>
        <table style="width: 500px; border-collapse: collapse;">
          <thead>
            <tr style="background: black; color: #fff; text-align: left;">
              <th style="font-size: 16px;">Detalles de fundición</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Construcción</td>
              <td style="text-align: right;">${this.categoria}</td>
            </tr>
            <tr>
              <td>Tipo</td>
              <td style="text-align: right;">${this.subcategoria}</td>
            </tr>
            <tr>
              <td>Metros cúbicos</td>
              <td style="text-align: right;">${this.metros3}</td>
            </tr>
          </tbody>
        </table>
      </section>
      `;
      const data: UserData = {
        categoria: this.categoria,
        subcaegoria: this.subcategoria,
        nombre: this.formaUserData.value.nombre,
        telefono: this.formaUserData.value.telefono,
        departamento: this.formaUserData.value.departamento,
        metros3: this.metros3,
        emailCotizacion: 'edgon85@gmail.com',
        email: this.formaUserData.value.correo.toLowerCase(),
        data: htmlData,
      };

      const dataUser: UserData = {
        categoria: this.categoria,
        subcaegoria: this.subcategoria,
        nombre: this.formaUserData.value.nombre,
        telefono: this.formaUserData.value.telefono,
        departamento: this.formaUserData.value.departamento,
        metros3: this.metros3,
        emailCotizacion: 'edgon85@gmail.com',
        email: this.formaUserData.value.correo.toLowerCase(),
        data: htmlDataUser,
      };
      // console.log(data);
      this.sendEmailCotizacion(data);

      if (this.formaUserData.value.correo === '') {
        return;
      } else {
        this.sendEmailUser(dataUser);
      }
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
      telefono: [
        '',
        [
          Validators.required,
          Validators.pattern(new RegExp('^[0-9]*$')),
          Validators.minLength(8),
          Validators.maxLength(8),
        ],
      ],
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

    this.step1.nativeElement.classList.remove('display-none');
    this.step2.nativeElement.classList.add('display-none');
    this.step3.nativeElement.classList.add('display-none');
    /* this.line1.nativeElement.classList.add('change-line'); */
    this.borderBottom2.nativeElement.classList.remove('border-blue');
    this.borderBottom3.nativeElement.classList.remove('border-blue');

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

  sendEmailCotizacion(data: any) {
    const id = Date.now();

    const userRef: AngularFirestoreDocument = this.afs.doc(
      `cotizaciones/${id}`
    );

    return userRef
      .set(data)
      .then((resp) => console.log('creado satisfactoriamente cotización'))
      .catch((err) => console.log('ocurrio un error', err));
  }

  sendEmailUser(data: any) {
    const id = Date.now();

    const userRef: AngularFirestoreDocument = this.afs.doc(
      `cotizacionesUsuario/${id}`
    );

    return userRef
      .set(data)
      .then((resp) => console.log('creado satisfactoriamente usuario'))
      .catch((err) => console.log('ocurrio un error', err));
  }

  // Open link de whatsapp
  openWhatsApp() {
    const url = 'https://api.whatsapp.com/send?phone=50256116171';
    window.open(url, '_blank');
    window.open().opener = null;
  }
  // Open link de whatsapp
  openPhoneCall() {
    const url = 'tel:+50256116171';
    window.open(url, '_blank');
    window.open().opener = null;
  }
}
