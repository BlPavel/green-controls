import { ICustomMessageError } from './custom-message-error';

export interface IMessageError extends ICustomMessageError {
  'required': string;
  'email': string;
  'pattern': string;
  'notequal': string;
  'mask': string;
  'minlength': string;
  'maxlength': string;
  'notSelected': string;
}
