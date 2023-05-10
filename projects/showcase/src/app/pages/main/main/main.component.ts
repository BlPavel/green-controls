import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: [ './main.component.scss' ],
})
export class MainComponent {
  public titleCards: string[] = [
    'Basic controls',
    'Date control',
    'Field Control',
    'Autocomplite',
    'Form address',
    'Form contacts',
    'Form passport',
    'Form personal info',
    'Message error',
  ];

  public links: string[] = [
    '/basic_controls',
    'date_control',
    'field_Control',
    'auto_complite',
    'form_address',
    'form_contacts',
    'form_passport',
    'form_personal_info',
    'message_error',
  ];
}
