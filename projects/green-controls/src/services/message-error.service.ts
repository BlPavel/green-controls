import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICustomMessageError, IMessageError } from 'green-controls/src/interfaces';

@Injectable()
export class MessageErrorService {
  private _messageError$: BehaviorSubject<string> = new BehaviorSubject('');

  public readonly messageError$: Observable<string> = this._messageError$.asObservable();

  public error!: ValidationErrors | null;

  public messageError: IMessageError = {} as IMessageError;

  public customMessageError?: ICustomMessageError;

  private _isFindError: boolean = false;

  public checkError() {
    if (this.error) {
      const length: string = this.error?.['maxlength']?.requiredLength || this.error?.['minlength']?.requiredLength || '';
      const error: string = Object.keys(this.error)[0];
      this._chooseMessageError(error, length);
    } else {
      this._messageError$.next('');
    }
  }

  private _chooseMessageError(error: string, length: string): void {
    this._isFindError = false;

    if (this.customMessageError) {
      this._setMessageError(error, length, this.customMessageError);
    }

    if (!this._isFindError) {
      this._setMessageError(error, length, this.messageError);
    }
  }

  private _setMessageError(error: string, length: string, messageError: ICustomMessageError | IMessageError): void {
    for (const key in messageError) {
      if (key === error && length) {
        const replace: string = messageError[key as keyof typeof messageError].replace(/\$length\b/g, length);
        this._messageError$.next(replace);
        this._isFindError = true;
        return;
      } if (key === error) {
        this._messageError$.next(messageError[key as keyof typeof messageError]);
        this._isFindError = true;
        return;
      }
    }
  }
}
