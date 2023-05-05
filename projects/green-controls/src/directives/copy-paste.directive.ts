import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[grCopyPaste]',
  standalone: true,
})
export class CopyPasteDirective {
  constructor(private readonly _control: NgControl) {}

  @HostListener('keydown', [ '$event' ])
  onKeyDown(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'v') {
      navigator.clipboard.readText().then((text) => {
        this._control.control?.setValue(text);
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
    }
    if (event.ctrlKey && event.key === 'c') {
      navigator.clipboard.writeText(this._control.control?.value)
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
        });
    }
  }
}
