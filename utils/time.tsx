import {formatInTimeZone} from "date-fns-tz/formatInTimeZone";
import {useCalendars} from "expo-localization";

export function FormattedTime({time, format}: { time: string, format?: string }) {
    const calendar = useCalendars()[0];
    const timeZone = calendar.timeZone;
    const UTCTime = time.endsWith('Z') ? time : time + 'Z';
    const date = new Date(UTCTime);
    const formattedTime = timeZone ? formatInTimeZone(UTCTime, timeZone, format || 'HH:mm - dd.MM.yyyy') : ''

    return isNaN(date.getTime()) ? 'N/a' : formattedTime
}