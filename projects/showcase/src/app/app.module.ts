import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GreenBasicInputModule, MessageErrorModule } from 'green-controls/src/controls';
import { ReactiveFormsModule } from '@angular/forms';
import { IMessageError } from 'green-controls/src/interfaces';
import { MarkAsTouchedDirective } from 'green-controls/src/directives';
import { GreenFormPassportModule } from 'green-controls/src/forms';


const messageError: IMessageError = {
  required: 'required',
  email: 'email',
  pattern: 'pattern',
  notequal: 'notequal',
  mask: 'mask',
  minlength: 'minlength',
  maxlength: 'maxlength',
  notSelected: 'notSelected'
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GreenBasicInputModule,
    ReactiveFormsModule,
    MessageErrorModule.forRoot(messageError),
    MarkAsTouchedDirective,
    GreenFormPassportModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
