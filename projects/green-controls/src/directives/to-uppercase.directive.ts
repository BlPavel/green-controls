import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[grToUppercase]',
  standalone: true,
})
export class ToUppercaseDirective {
  constructor(private readonly _control: NgControl) {}

  @HostListener('input', [ '$event' ])
  transformToUppercase(): void {
    const inputValue: string = this._control.control?.value as string;
    this._control.control?.patchValue(inputValue.charAt(0).toUpperCase() + inputValue.slice(1));
  }
}
