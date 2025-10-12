import {formatInTimeZone} from "date-fns-tz/formatInTimeZone";
import {useCalendars, getCalendars} from "expo-localization";

export function FormattedTime({time, format}: { time: string, format?: string }) {
    const calendar = useCalendars()[0];
    const timeZone = calendar.timeZone;
    const UTCTime = time.endsWith('Z') ? time : time + 'Z';
    const date = new Date(UTCTime);

    const formattedTime = timeZone ? formatInTimeZone(UTCTime, timeZone, format || 'HH:mm - dd.MM.yyyy') : ''

    return isNaN(date.getTime()) ? 'N/a' : formattedTime
}

// Hook für React-Komponenten - verwendet useCalendars
export function useTimeZone(): string {
    const calendars = useCalendars();
    return calendars[0]?.timeZone || 'UTC';
}

// Normale Funktion für nicht-React Kontexte - verwendet getCalendars (synchron)
export function getTimeZone(): string {
    try {
        const calendars = getCalendars();
        return calendars[0]?.timeZone || 'UTC';
    } catch (error) {
        console.warn('Failed to get timezone, using UTC as fallback:', error);
        return 'UTC';
    }
}