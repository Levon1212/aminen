// Timezone helpers shared (by copy) with Haylang-Admin/src/utils/timezone.ts — keep both in sync.
// The API stores and returns booking dates/times in UTC; only display layers convert.
import { DateTime } from "luxon";

export const DEFAULT_TEACHER_TIMEZONE = "America/Winnipeg";

// Used when the browser lacks Intl.supportedValuesOf
const FALLBACK_TIMEZONES = [
  "Africa/Cairo", "Africa/Johannesburg", "Africa/Lagos", "America/Anchorage", "America/Argentina/Buenos_Aires",
  "America/Bogota", "America/Chicago", "America/Denver", "America/Halifax", "America/Los_Angeles",
  "America/Mexico_City", "America/New_York", "America/Phoenix", "America/Sao_Paulo", "America/St_Johns",
  "America/Toronto", "America/Vancouver", "America/Winnipeg", "Asia/Baku", "Asia/Bangkok", "Asia/Dubai",
  "Asia/Hong_Kong", "Asia/Jerusalem", "Asia/Karachi", "Asia/Kolkata", "Asia/Seoul", "Asia/Shanghai",
  "Asia/Singapore", "Asia/Tbilisi", "Asia/Tehran", "Asia/Tokyo", "Asia/Yerevan", "Atlantic/Reykjavik",
  "Australia/Adelaide", "Australia/Brisbane", "Australia/Perth", "Australia/Sydney", "Europe/Amsterdam",
  "Europe/Athens", "Europe/Berlin", "Europe/Istanbul", "Europe/Kyiv", "Europe/Lisbon", "Europe/London",
  "Europe/Madrid", "Europe/Moscow", "Europe/Paris", "Europe/Rome", "Europe/Warsaw", "Pacific/Auckland",
  "Pacific/Honolulu", "UTC",
];

export const isValidTimezone = (tz: string | null | undefined): boolean =>
  !!tz && DateTime.local().setZone(tz).isValid;

export const detectTimezone = (): string => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return isValidTimezone(tz) ? tz : "UTC";
  } catch {
    return "UTC";
  }
};

// Full IANA list, sorted, with `first` (e.g. the detected zone) moved to the top
export const getTimezoneList = (first?: string | null): string[] => {
  const supportedValuesOf = (Intl as unknown as { supportedValuesOf?: (key: string) => string[] })
    .supportedValuesOf;
  let zones: string[] = [];
  try {
    zones = supportedValuesOf ? supportedValuesOf("timeZone") : [];
  } catch {
    zones = [];
  }
  if (zones.length === 0) zones = FALLBACK_TIMEZONES;

  const list = Array.from(new Set([...zones, "UTC"])).filter(isValidTimezone).sort();
  if (first && isValidTimezone(first)) {
    return [first, ...list.filter((z) => z !== first)];
  }
  return list;
};

// "UTC+02:00" — the zone's offset right now
export const formatUtcOffset = (tz: string): string => `UTC${DateTime.now().setZone(tz).toFormat("ZZ")}`;

// "Europe/Madrid (UTC+02:00)"
export const timezoneLabel = (tz: string): string => `${tz} (${formatUtcOffset(tz)})`;

// API UTC date ("YYYY-MM-DD") + time ("HH:mm" or "HH:mm:ss") as a DateTime in `tz`
export const utcToZone = (date: string, time: string | null, tz: string): DateTime => {
  const t = time ? (time.length === 5 ? `${time}:00` : time) : "00:00:00";
  return DateTime.fromISO(`${date}T${t}`, { zone: "utc" }).setZone(tz);
};

// Wall-clock date + time in `tz` → UTC { date: "YYYY-MM-DD", time: "HH:mm:ss" }
export const zoneToUtc = (date: string, time: string, tz: string): { date: string; time: string } => {
  const dt = DateTime.fromISO(`${date}T${time}`, { zone: tz }).toUTC();
  return { date: dt.toISODate() ?? date, time: dt.toFormat("HH:mm:ss") };
};

// Format an API UTC date + time in `tz`
export const formatInZone = (
  date: string | null,
  time: string | null,
  tz: string,
  format = "ccc d LLL yyyy, HH:mm"
): string => (date ? utcToZone(date, time, tz).toFormat(format) : "—");

// Format a full ISO instant (e.g. "2026-11-02T10:00:00.000000Z") in `tz`
export const formatInstantInZone = (iso: string, tz: string, format = "d LLL yyyy, HH:mm"): string =>
  DateTime.fromISO(iso, { zone: "utc" }).setZone(tz).toFormat(format);

export const todayInZone = (tz: string): string => DateTime.now().setZone(tz).toISODate() ?? "";
