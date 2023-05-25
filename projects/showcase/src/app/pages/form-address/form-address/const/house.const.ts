import { Validators } from '@angular/forms';
import { GreenPattern } from 'green-controls/src/classes';
import { IDataAddressHouse } from 'green-controls/src/interfaces';

export const dataAddressHouseReg: IDataAddressHouse = {
  house: {
    label: 'Дом, литера, корпус, строение',
    maxLength: 50,
    validators: [ Validators.required, Validators.pattern(GreenPattern.houseValidationPattern) ],
  },
  flat: {
    label: 'Квартира',
    maxLength: 50,
    validators: [ Validators.pattern(GreenPattern.houseValidationPattern) ],
  },
};

export const dataAddressHouseHome: IDataAddressHouse = {
  house: {
    label: 'Дом, литера, корпус, строение',
    maxLength: 50,
    validators: [ Validators.required, Validators.pattern(GreenPattern.houseValidationPattern) ],
  },
  flat: {
    label: 'Квартира',
    maxLength: 50,
    validators: [ Validators.pattern(GreenPattern.houseValidationPattern) ],
  },
};
