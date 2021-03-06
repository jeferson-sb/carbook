import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { DateProvider } from '@lib/DateProvider';

dayjs.extend(utc);

export class DayjsDateProvider implements DateProvider {
  dateNow(): Date {
    return dayjs().toDate();
  }

  compareInHours(startDate: Date, endDate: Date): number {
    const startDateUTC = this.convertToUTC(startDate);
    const endDateUTC = this.convertToUTC(endDate);

    return dayjs(endDateUTC).diff(startDateUTC, 'hours');
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }

  compareInDays(startDate: Date, endDate: Date): number {
    const startDateUTC = this.convertToUTC(startDate);
    const endDateUTC = this.convertToUTC(endDate);

    return dayjs(endDateUTC).diff(startDateUTC, 'days');
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, 'hour').toDate();
  }

  compareIfBefore(startDate: Date, endDate: Date): boolean {
    return dayjs(startDate).isBefore(endDate);
  }
}
