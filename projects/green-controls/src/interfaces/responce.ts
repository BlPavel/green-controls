export interface IResponseModel<T> {
  status: IStatusModel;
  result: T;
}

interface IStatusModel {
  code: number;
  text: string;
  extendedStatus: unknown;
}
