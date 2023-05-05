import { FormControl } from '@angular/forms';

export interface IAddressForm<TRegion, VCity, UStreet> {
  region: FormControl<string | TRegion>,
  city: FormControl<string | VCity>,
  street: FormControl<string | UStreet>,
  withoutStreet: FormControl<boolean>,
  house: FormControl<string>,
  flat: FormControl<string>,
}
