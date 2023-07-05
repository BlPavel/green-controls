import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MyPattern {
  public enEmailValidationPattern: string = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.]+\\.[a-zA-Z]{2,4}$';

  public ruEmailValidationPattern: string = '^[а-яА-ЯЁ0-9._-]+@[а-яА-ЯЁ0-9.-]+\\.[а-яА-ЯЁ]{2,4}$';

  public nameValidationPattern: string = '^[А-ЯЁ][А-Яа-яЁё\'-\\s]{0,}$';

  public docIssuerValidationPattern: string = '^[а-яА-ЯЁё0-9№.,-\\s]{0,}$';

  public placeValidationPattern: string = '^[a-zA-Zа-яА-ЯЁё0-9.-\\s]{0,}$';

  public creditNumber: string = '^[a-zA-Zа-яА-ЯЁё0-9-]{0,}$';

  public namePerson = '';

  public issuedCodeValidationPattern = '^[0-9-]{6,6}$';

  public houseValidationPattern = '^[0-9а-яА-Я.,-/]{0,}$';
}
