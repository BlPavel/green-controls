import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'form[grScrollToInvalidInput]',
  standalone: true,
})
export class ScrollToInvalidInputDirective {
  constructor(private readonly _el: ElementRef) {}

  @HostListener('submit')
  public scrollToFirstInvalidControl(): void {
    const firstInvalidControl: HTMLElement = this._el.nativeElement.querySelector('form .ng-invalid')
      ? this._el.nativeElement.querySelector('form .ng-invalid')
      : this._el.nativeElement.querySelector('form .toScroll');
    if (firstInvalidControl) {
      window.scroll({
        top: this._getTopOffset(firstInvalidControl),
        left: 0,
        behavior: 'smooth',
      });
    }
  }

  private _getTopOffset(controlEl: HTMLElement): number {
    const labelOffset = 50;
    return controlEl.getBoundingClientRect().top + window.scrollY - labelOffset;
  }
}
