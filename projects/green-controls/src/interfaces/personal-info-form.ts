import { FormControl } from '@angular/forms';

export interface IPersonalInfoForm {
  surname: FormControl<string>,
  name: FormControl<string>,
  patronimyc: FormControl<string>,
  isExistPatronymic?: FormControl<boolean>,
  dateOfBirth: FormControl<string>,
}
