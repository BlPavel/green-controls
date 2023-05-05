import { FormControl } from '@angular/forms';

export interface IContactsForm {
  phone: FormControl<string>;
  email: FormControl<string>;
  repeatEmail: FormControl<string>;
}
