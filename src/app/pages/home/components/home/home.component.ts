import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  formaUserData: FormGroup;

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
    if (this.formaUserData.invalid) {
      Swal.fire('', 'Llene todos los campos', 'error');
      return;
    } else {
      Swal.fire(
        '¡Gracias por contactarse!',
        'En un momento un asesor se comunicara con usted',
        'success'
      );
      console.log(this.formaUserData.value);
      this.formaUserData.reset({
        nombre: '',
        correo: '',
        telefono: '',
      });
    }
  }
}
