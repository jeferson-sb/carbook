export interface DateProvider {
  dateNow(): Date;
  compareInHours(startDate: Date, endDate: Date): number;
  convertToUTC(date: Date): string;
  addDays(days: number): Date;
  compareInDays(startDate: Date, endDate: Date): number;
  addHours(hours: number): Date;
  compareIfBefore(startDate: Date, endDate: Date): boolean;
}
