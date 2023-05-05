import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { IDateService } from 'green-controls/src/interfaces';

@Injectable({ providedIn: 'root' })
export class DateService implements IDateService {
  private readonly _dateNow: DateTime = DateTime.now();

  public calcMaxBirthDay(): string {
    const maxBirthDay: string = this._dateNow.minus({ year: 18 }).toString();
    return maxBirthDay;
  }

  public calcMinDateOfIssue(dateBirthDay: string): string {
    if (dateBirthDay) {
      const newBirthDate = DateTime.fromISO(dateBirthDay);
      const diffDuration = newBirthDate.diffNow('years');
      const insurerAgeYear = -diffDuration.years;
      const insurerAgeMount = Math.round((diffDuration.years - Math.round(diffDuration.years)) * 10);

      let minDatePassport: DateTime;
      if (insurerAgeYear > 45 || (insurerAgeYear === 45 && insurerAgeMount >= 1)) {
        // if date of birthday more than 45 years and 1 month
        // The date of issue must be more than 45 years from the date of birth
        minDatePassport = DateTime.fromISO(dateBirthDay).plus({ years: 45 });
      } else if (insurerAgeYear > 20 || (insurerAgeYear === 20 && insurerAgeMount >= 1)) {
        // if date of birthday more than 20 years and 1 month
        // The date of issue must be more than 20 years from the date of birth
        minDatePassport = DateTime.fromISO(dateBirthDay).plus({ years: 20 });
      } else {
        // just return 15 years since the birth
        minDatePassport = DateTime.fromISO(dateBirthDay).plus({ years: 14 });
      }
      return minDatePassport.toString();
    }
    return DateTime.utc(1900, 1, 1).toString();
  }

  public calcMaxDateOfIssue(): string {
    return this._dateNow.toString();
  }
}
