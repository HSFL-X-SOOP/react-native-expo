import {formatInTimeZone} from "date-fns-tz/formatInTimeZone";

/**
 * Formats a UTC time string to the local timezone
 * @param time - ISO 8601 time string
 * @param format - date-fns format string (default: 'HH:mm - dd.MM.yyyy')
 * @returns Formatted time string in local timezone
 */
export function formatTimeToLocal(time: string, format?: string): string {
    const UTCTime = time.endsWith('Z') ? time : time + 'Z';
    const date = new Date(UTCTime);

    if (isNaN(date.getTime())) {
        return 'N/a';
    }

    // Get system timezone using Intl API
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    try {
        return formatInTimeZone(UTCTime, timeZone, format || 'HH:mm - dd.MM.yyyy');
    } catch {
        return 'N/a';
    }
}