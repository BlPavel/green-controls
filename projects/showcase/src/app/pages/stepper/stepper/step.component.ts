import { Component, OnInit } from '@angular/core';
import { IStepper, StepperService } from 'green-components-premium';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: [ './step.component.scss' ],
})
export class StepComponent implements OnInit {
  public steps: IStepper[] = [
    {
      no: 1,
      title: 'Выбор полиса',
    }, {
      no: 2,
      title: 'Оформление',
    }, {
      no: 3,
      title: 'Подтверждение',
    },
  ];

  public step$!: Observable<any>;

  constructor(private readonly _stepper: StepperService) {}

  ngOnInit(): void {
    this.step$ = this._stepper.stepper$;

    this.step$.subscribe((step) => {
      console.log(step);
    });
  }

  next() {
    this._stepper.next();
  }
}
