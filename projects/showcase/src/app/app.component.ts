import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDataDateInput } from 'green-controls/src/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit {
  public title: string = 'Title';

  public isShow: boolean = true;

  public form: FormGroup = new FormGroup({
    name: new FormControl(''),
    check: new FormControl(false),
    passport: new FormControl(''),
  });

  public changeShow():void {
    this.isShow = !this.isShow;
  }

  ngOnInit(): void {
    this.form.get('check')?.valueChanges.subscribe((v) => {
      if (v) {
        this.form.get('name')?.disable();
      } else {
        this.form.get('name')?.enable();
      }
    });
  }

  public dataName: IDataDateInput = {
    label: 'name',
    validators: [ Validators.required, Validators.minLength(2) ],
  };

  public onSubmit():void {
  }
}
