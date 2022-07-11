import moment from 'moment-timezone';
import {find} from 'geo-tz';

export class DateTime {
  private _date: moment.Moment;

  constructor(date: string | number | Date | {
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    second: number,
    millisecond: number
  });

  // tslint:disable-next-line:ter-max-len
  constructor(date: string | number | Date | { year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number }, timezone: string);

  // tslint:disable-next-line:ter-max-len
  constructor(date: string | number | Date | { year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number }, timezone?: string) {
    const d = moment(date);
    this._date = timezone ? moment.tz(d.toISOString(), timezone) : d;
  }

  static fromMinutes(minutes: number): DateTime {
    const zero = moment().startOf('date');
    return new DateTime(zero.add(minutes, 'minutes').unix() * 1000);
  }

  public adjustTimezone(timezoneInHour: number): DateTime {
    if (timezoneInHour < 0) {
      this._date.subtract(timezoneInHour * -1, 'hours');
    } else if (timezoneInHour > 0) {
      this._date.add(timezoneInHour, 'hours');
    }
    return this;
  }

  public isBetween(a: DateTime, b: DateTime, granularity?: moment.unitOfTime.StartOf | undefined, inclusivity?: '()' | '[)' | '(]' | '[]' | undefined): boolean {
    return this._date.isBetween(moment(a.toDate()), moment(b.toDate()), granularity, inclusivity);
  }

  public isBefore(other: DateTime): boolean {
    return this._date.isBefore(moment(other.toDate()));
  }

  public isAfter(other: DateTime) {
    return this._date.isAfter(moment(other.toDate()));
  }

  public toString(): string {
    return this._date.format();
  }

  public equalsTo(date: DateTime): boolean {
    return this._date.toDate().getTime() === date.toDate().getTime();
  }

  public equalsInMinutesTo(date: DateTime): boolean {
    return this._date.toDate().getUTCFullYear() === date.toDate().getFullYear() &&
      this._date.toDate().getMonth() === date.toDate().getMonth() &&
      this._date.toDate().getDate() === date.toDate().getDate() &&
      this._date.toDate().getHours() === date.toDate().getHours();
  }

  public toDate(): Date {
    return this._date.toDate();
  }

  public add(minutes: number): DateTime {
    const cloneDay = this._date.clone();
    cloneDay.add(minutes, 'minutes');
    return new DateTime(cloneDay.toDate());
  }

  public subtract(minutes: number): DateTime {
    const cloneDay = this._date.clone();
    cloneDay.subtract(minutes, 'minutes');
    return new DateTime(cloneDay.toDate());
  }

  public clone(): DateTime {
    const cloneDay = this._date.clone();
    return new DateTime(cloneDay.toDate());
  }

  /**
   * @return — Unix timestamp in milliseconds
   */
  public millisecondsSinceEpoch(): number {
    return this._date.valueOf();
  }

  public minutesFromStartOfDay(): number {
    return this._date.hour() * 60 + this._date.minute();
  }

  public weekDay(): number {
    return this._date.day();
  }

  static now(): number {
    return moment.now();
  }

  static nowDateTime(): DateTime {
    const now: moment.Moment = moment();
    return new DateTime(now.valueOf());
  }

  static zero(unitOfTime: 'year' | 'month' | 'day' | 'date' | 'hour' | 'minute' | 'second' | 'millisecond') {
    const zero: moment.Moment = moment().startOf(unitOfTime);
    return new DateTime(zero.format());
  }

  public format(format?: string) {
    return this._date.format(format);
  }

  toIsoString(): string {
    return this._date.toISOString();
  }

  toZero(): DateTime {
    return new DateTime(this._date.clone().startOf('day').toDate()); //this.subtract(this.minutesFromStartOfDay());
  }

  copyWith({
             year,
             month,
             day,
             hour,
             minute,
             second,
             millisecond
           }: {
    year?: number,
    month?: number,
    day?: number,
    hour?: number,
    minute?: number,
    second?: number,
    millisecond?: number
  }): DateTime {
    const cloneDay = this._date.clone();
    if (year !== undefined) {
      cloneDay.year(year);
    }
    if (month !== undefined) {
      cloneDay.month(month);
    }
    if (day !== undefined) {
      cloneDay.date(day);
    }
    if (hour !== undefined) {
      cloneDay.hour(hour);
    }
    if (minute !== undefined) {
      cloneDay.minute(minute);
    }
    if (second !== undefined) {
      cloneDay.second(second);
    }
    if (millisecond !== undefined) {
      cloneDay.millisecond(millisecond);
    }
    return new DateTime(cloneDay.toDate());
  }

  static timezoneFromCoordinates(latitude: number, longitude: number): string {
    const timezoneInHour = find(latitude, longitude);
    return timezoneInHour[0];
  }

  /*  private static stringTimezoneToNumber(t: string): number {
      const sign = t.charAt(0);
      const timezone = t.substring(1);
      const hours = Number(timezone.split(":")[0]);
      const minutes = Number(timezone.split(":")[1]);

      if (sign === "-") {
        return -1 * ((hours * 60) + minutes);
      } else {
        return (hours * 60) + minutes;
      }

    }*/
}
