import { Injectable } from '@angular/core';
import { GreenPattern } from 'green-controls/src/classes';

@Injectable({ providedIn: 'root' })
export class CustomPattern extends GreenPattern {
  public override docIssuerValidationPattern: string = '^[0-9№.,-\\s]{0,}$';
}
