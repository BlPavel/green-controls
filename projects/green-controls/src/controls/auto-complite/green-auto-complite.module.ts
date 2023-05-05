import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { SetErrorMessageDirective, MarkTouchedInputDirective } from 'green-controls/src/directives';
import { AutoCompliteComponent } from './auto-complite/auto-complite.component';

@NgModule({
  declarations: [ AutoCompliteComponent ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    SetErrorMessageDirective,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MarkTouchedInputDirective,
  ],
  exports: [ AutoCompliteComponent ],
})
export class GreenAutoCompliteModule { }
