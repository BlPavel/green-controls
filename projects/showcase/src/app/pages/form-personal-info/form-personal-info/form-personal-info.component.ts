import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-personal-info',
  templateUrl: './form-personal-info.component.html',
  styleUrls: [ './form-personal-info.component.scss' ],
})
export class FormPersonalInfoComponent {
  public form = new FormGroup({
    personalInfo: new FormControl({
      name: 'Ва',
      isExistPatronymic: true,
      patronimyc: 'sa',
    }),
  });
}
