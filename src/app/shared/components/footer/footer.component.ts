import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  //

  formaUserData: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formUserData();
  }

  // <=================================================================> //
  // Formulario de datos de usuario
  // <=================================================================> //
  formUserData() {
    this.formaUserData = this.fb.group({
      correo: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  suscribirse() {
    if (this.formaUserData.invalid) {
      Swal.fire('', 'Ingrese un correo valido', 'error');
      return;
    } else {
      Swal.fire(
        '¡Gracias por suscribirse!',
        'Recibirá información de nuestras promociones',
        'success'
      );
    }

    this.formaUserData.reset({
      correo: '',
    });
  }
}
