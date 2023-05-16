import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-passport',
  templateUrl: './form-passport.component.html',
  styleUrls: [ './form-passport.component.scss' ],
})
export class FormPassportComponent {
  public form = new FormGroup({
    passport: new FormControl(''),
  });
}
