import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
})
export class ContactoComponent implements OnInit {
  //

  formaUserData: FormGroup;

  datos: object = {
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: '',
    data: '',
  };

  constructor(private fb: FormBuilder, private afs: AngularFirestore) {}

  ngOnInit() {
    this.formUserData();
  }

  // <=================================================================> //
  // Formulario de datos de usuario
  // <=================================================================> //
  formUserData() {
    this.formaUserData = this.fb.group({
      nombre: ['', Validators.required],
      asunto: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      mensaje: ['', Validators.required],
    });
  }

  sendData() {
    this.datos = {
      nombre: this.formaUserData.value.nombre,
      correo: this.formaUserData.value.correo,
      asunto: this.formaUserData.value.asunto,
      mensaje: this.formaUserData.value.mensaje,
      data: `
      <section style="padding: 20px 10px">
      <p>Hola mi nombre es ${this.formaUserData.value.nombre}</p>
      <p>Necesito informacion de ${this.formaUserData.value.asunto}</p>
      <p>Mensaje:</p>
      <p>${this.formaUserData.value.mensaje}</p>

      <p>Correo: ${this.formaUserData.value.correo}</p>
      `,
    };

    if (this.formaUserData.invalid) {
      Swal.fire('', 'Llene todos los campos', 'error');
      return;
    } else {
      Swal.fire(
        '¡Gracias por contactarse!',
        'En un momento un asesor se comunicara con usted',
        'success'
      );
      this.saveData(this.datos);
      console.log(this.formaUserData.value);
      this.formaUserData.reset({
        nombre: '',
        correo: '',
        asunto: '',
        mensaje: '',
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
