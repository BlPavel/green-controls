import {
  AfterViewInit,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  Self,
  SkipSelf,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { MarkAsTouchedDirective } from './mark-as-touched.directive';
import { SetErrorMessageDirective } from './set-error-message.directive';

@Directive({
  selector: 'input[grMarkTouchedInput], textarea[grMarkTouchedInput]',
  providers: [ MarkAsTouchedDirective ],
  standalone: true,
})
export class MarkTouchedInputDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  public set isDisabled(disabled: boolean) {
    if (disabled !== this._disabled) {
      this._markAsTouched();
      this._disabled = disabled;
    }
  }

  private _disabled: boolean = false;

  private _submitListener?: () => void;

  constructor(
    @Optional() @SkipSelf() private readonly _markAsTouchedDirective: MarkAsTouchedDirective,
    @Self() private readonly _setErrorDirective: SetErrorMessageDirective,
    private readonly _control: NgControl,
    private readonly _render: Renderer2,
  ) {}

  private _markAsTouched(): void {
    this._control.control?.markAsTouched();
    this._control.control?.updateValueAndValidity();
    this._setErrorDirective.chooseError();
  }

  ngOnInit(): void {
    if (this._markAsTouchedDirective) {
      // eslint-disable-next-line no-undef
      const form: HTMLElement = this._markAsTouchedDirective.element.nativeElement;
      this._submitListener = this._render.listen(form, 'submit', () => {
        this._markAsTouched();
      });
    }
  }

  ngAfterViewInit(): void {
    if (this._markAsTouchedDirective) {
      const form: HTMLElement = this._markAsTouchedDirective.element.nativeElement;
      Promise.resolve().then(() => {
        if (form.classList.contains('ng-submitted')) {
          this._markAsTouched();
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this._submitListener) {
      this._submitListener();
    }
  }
}
