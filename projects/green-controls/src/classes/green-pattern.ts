export class GreenPattern {
  public static enEmailValidationPattern: string = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.]+\\.[a-zA-Z]{2,4}$';

  public static ruEmailValidationPattern: string = '^[а-яА-ЯЁ0-9._-]+@[а-яА-ЯЁ0-9.-]+\\.[а-яА-ЯЁ]{2,4}$';

  public static nameValidationPattern: string = '^[А-ЯЁ][А-Яа-яЁё\'-\\s]{0,}$';

  public static docIssuerValidationPattern: string = '^[а-яА-ЯЁё0-9№.,-\\s]{0,}$';

  public static placeValidationPattern: string = '^[a-zA-Zа-яА-ЯЁё0-9.-\\s]{0,}$';

  public static creditNumber: string = '^[a-zA-Zа-яА-ЯЁё0-9-]{0,}$';

  public static namePerson = '^[А-ЯЁ][А-Яа-яЁё\'-\\s]{0,}$';

  public static issuedCodeValidationPattern = '^[0-9-]{7,7}$';

  public static houseValidationPattern = '^[0-9а-яА-Я.,-/]{0,}$';
}
