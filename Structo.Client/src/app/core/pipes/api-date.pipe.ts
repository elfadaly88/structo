import { Pipe, PipeTransform, inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';

const SERVER_DATE = /^(\d{2})\/(\d{2})\/(\d{4})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?$/;

/**
 * Parses a date sent by the API. The server serializes every DateTime as "dd/MM/yyyy HH:mm:ss" (UTC),
 * which Angular's DatePipe cannot read: it throws for days > 12 and swaps day/month for days <= 12.
 * ISO strings and Date objects are accepted as well. Returns null when the value is empty or unreadable.
 */
export function parseApiDate(value: string | Date | null | undefined): Date | null {
  if (!value) return null;
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;

  const match = SERVER_DATE.exec(value.trim());
  if (match) {
    const [, dd, mm, yyyy, hh = '0', min = '0', ss = '0'] = match;
    const date = new Date(Date.UTC(+yyyy, +mm - 1, +dd, +hh, +min, +ss));
    return isNaN(date.getTime()) ? null : date;
  }

  const iso = new Date(value);
  return isNaN(iso.getTime()) ? null : iso;
}

/**
 * Drop-in replacement for `| date` on values that come from the API: `{{ item.createdAt | apiDate:'dd/MM/yyyy HH:mm' }}`.
 * Never throws; shows the fallback (default '—') when the value is missing or unreadable.
 */
@Pipe({ name: 'apiDate', standalone: true })
export class ApiDatePipe implements PipeTransform {
  private readonly locale = inject(LOCALE_ID);

  transform(value: string | Date | null | undefined, format = 'dd/MM/yyyy', fallback = '—'): string {
    const date = parseApiDate(value);
    return date ? formatDate(date, format, this.locale) : fallback;
  }
}
