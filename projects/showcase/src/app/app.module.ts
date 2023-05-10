import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GreenBasicInputModule, MessageErrorModule } from 'green-controls/src/controls';
import { ReactiveFormsModule } from '@angular/forms';
import { IMessageError } from 'green-controls/src/interfaces';
import { MarkAsTouchedDirective } from 'green-controls/src/directives';
import { GreenFormPassportModule } from 'green-controls/src/forms';
import { TitleStrategy } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainModule } from './pages/main/main.module';
import { TemplatePageTitleStrategyService } from './services/template-page-title-strategy.service';

const messageError: IMessageError = {
  required: 'required',
  email: 'email',
  pattern: 'pattern',
  notequal: 'notequal',
  mask: 'mask',
  minlength: 'minlength',
  maxlength: 'maxlength',
  notSelected: 'notSelected',
};

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GreenBasicInputModule,
    ReactiveFormsModule,
    MessageErrorModule.forRoot(messageError),
    MarkAsTouchedDirective,
    GreenFormPassportModule,
    MainModule,
  ],
  providers: [ { provide: TitleStrategy, useClass: TemplatePageTitleStrategyService } ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
