export interface IDateService {
  calcMaxBirthDay(): string,
  calcMinDateOfIssue(dateBirthDay: string): string,
  calcMaxDateOfIssue(): string,
}
