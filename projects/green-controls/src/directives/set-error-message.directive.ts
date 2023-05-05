import {
  Directive, HostListener, Input, OnDestroy, OnInit, Self, Inject, OnChanges, SimpleChanges, Optional,
} from '@angular/core';
import {
  AbstractControl, FormGroup, NgControl, FormGroupDirective, Validators, ValidationErrors,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ICustomMessageError, IMessageError } from 'green-controls/src/interfaces';
import { MessageErrorService } from 'green-controls/src/services';
import { MESSAGE_ERROR } from 'green-controls/src/token';

@Directive({
  selector: 'textarea[grSetErrorMessage], input[grSetErrorMessage]',
  standalone: true,
})
export class SetErrorMessageDirective implements OnChanges, OnInit, OnDestroy {
  @Input()
  public connectInput: string = '';

  @Input()
  public customErrorMessage?: ICustomMessageError;

  @Input()
  public valueChange: unknown = '';

  @Input()
  public isTouchedDateToggle: boolean = false;

  private _form: FormGroup = new FormGroup({});

  private _subscribe?: Subscription | null = null;

  constructor(
    @Self() private readonly _control: NgControl,
    private readonly _messageErrorService: MessageErrorService,
    private readonly _formGroupDirective: FormGroupDirective,
    @Optional() @Inject(MESSAGE_ERROR) private readonly _messageError: IMessageError,
  ) {}

  @HostListener('blur')
  onBlur(): void {
    if (this._control.value instanceof Object && this._control.control?.hasValidator(Validators.required)) {
      this._control.control?.setErrors({ required: true });
    }
    this.chooseError();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['valueChange']) {
      this.chooseError();
    }
    if (changes['isTouchedDateToggle']) {
      this.chooseError();
    }
  }

  ngOnInit(): void {
    if (this._messageError) {
      this._messageErrorService.messageError = this._messageError;
    }

    this._form = this._formGroupDirective.form;

    this._updateConnectInput();

    if (this.customErrorMessage) {
      this._messageErrorService.customMessageError = this.customErrorMessage;
    }

    if (this._control.value) {
      this._control.control?.markAsTouched();
      this.chooseError();
    }
  }

  public chooseError(): void {
    let error: ValidationErrors | null = this._control?.errors;

    if (this._control?.errors?.['matDatepickerParse']) {
      error = { matDatepickerParse: 'text' };
    } else if (this._control.control?.hasValidator(Validators.required) && !this._control.control.value) {
      error = { required: true };
    }

    this._messageErrorService.error = error;
    this._messageErrorService.checkError();
  }

  private _updateConnectInput(): void {
    if (this.connectInput) {
      const input: AbstractControl | null = this._form.get(this.connectInput);
      this._subscribe = input?.valueChanges.subscribe(() => {
        if (this._control.touched) {
          this._control.control?.updateValueAndValidity();
          this.chooseError();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this._subscribe?.unsubscribe();
  }
}
