import { LuxonDateAdapter } from '@angular/material-luxon-adapter';
import { Inject, Injectable, Optional } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DateTime } from 'luxon';

@Injectable()
export class LuxonUtcDateAdapter extends LuxonDateAdapter {
  constructor(@Optional() @Inject(MAT_DATE_LOCALE) dateLocale: string) {
    super(dateLocale);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override parse(value: any): DateTime | null {
    if (typeof value === 'string' && value.indexOf('.') > -1) {
      const str = value.slice(0, 10).split('.');

      const year = Number(str[2]);
      const month = Number(str[1]);
      const date = Number(str[0]);

      return DateTime.utc(year, month, date).setLocale(this.locale);
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    const dateFromTimestamp = new Date(timestamp);

    const year = dateFromTimestamp.getFullYear();
    const month = dateFromTimestamp.getMonth() + 1;
    const date = dateFromTimestamp.getDate();

    // eslint-disable-next-line no-restricted-globals
    return isNaN(timestamp) ? null : DateTime.utc(year, month, date).setLocale(this.locale);
  }

  override createDate(year: number, month: number, date: number): DateTime {
    if (month < 0 || month > 11) {
      throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
    }

    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }

    const result = DateTime.utc(year, month + 1, date).setLocale(this.locale);

    if (!result.isValid) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }

    return result;
  }

  override getFirstDayOfWeek(): number {
    return 1;
  }
}
