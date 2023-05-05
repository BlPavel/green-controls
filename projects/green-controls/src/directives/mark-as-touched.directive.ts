import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: 'form[grMarkAsTouched]',
  standalone: true,
})
export class MarkAsTouchedDirective implements OnInit {
  public element!: ElementRef;

  constructor(private readonly _el: ElementRef) {}

  ngOnInit(): void {
    this.element = this._el;
  }
}
