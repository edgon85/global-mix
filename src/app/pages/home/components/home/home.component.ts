import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private fb: FormBuilder, private afs: AngularFirestore) {}

  formaUserData: FormGroup;

  datos: object = {
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: '',
    telefono: '',
    data: '',
  };

  ngOnInit() {
    this.formUserData();
  }

  // <=================================================================> //
  // Formulario de datos de usuario
  // <=================================================================> //
  formUserData() {
    this.formaUserData = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  sendData() {
    this.datos = {
      nombre: this.formaUserData.value.nombre,
      correo: this.formaUserData.value.correo,
      asunto: 'Contactar a un asesor',
      mensaje: 'Deseo que un asesor se comunique conmigo',
      telefono: this.formaUserData.value.telefono,
      data: `
      <section style="padding: 20px 10px">
      <p>Hola mi nombre es ${this.formaUserData.value.nombre}</p>
      <p>Mensaje:</p>
      <p>Deseo que un asesor se comunique conmigo</p>

      <p>Correo: ${this.formaUserData.value.correo}</p>
      <p>Teléfono: ${this.formaUserData.value.telefono}</p>
      `,
    };

    if (this.formaUserData.invalid) {
      Swal.fire('', 'Llene todos los campos', 'error');
      return;
    } else {
      Swal.fire(
        '¡Gracias por contactarse!',
        'En un momento un asesor se comunicará con usted',
        'success'
      );

      this.saveData(this.datos);
      console.log(this.formaUserData.value);
      this.formaUserData.reset({
        nombre: '',
        correo: '',
        telefono: '',
      });
    }
  }

  private saveData(data: any) {
    const id = Date.now();

    const userRef: AngularFirestoreDocument = this.afs.doc(`contactanos/${id}`);

    return userRef
      .set(data)
      .then((resp) => console.log('creado satisfactoriamente contactanos'))
      .catch((err) => console.log('ocurrio un error', err));
  }
}
