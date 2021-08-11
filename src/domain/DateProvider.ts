export interface DateProvider {
  dateNow(): Date;
  compareInHours(startDate: Date, endDate: Date): number;
  convertToUTC(date: Date): string;
  addDays(days: number): Date;
}
