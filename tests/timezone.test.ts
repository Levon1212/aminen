import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import {
  DEFAULT_TEACHER_TIMEZONE,
  detectTimezone,
  formatInstantInZone,
  formatInZone,
  getTimezoneList,
  isValidTimezone,
  todayInZone,
  utcToZone,
  zoneToUtc,
} from "../libs/timezone";

// These tests must pass under any machine zone: run with TZ=Asia/Tokyo, TZ=America/Winnipeg, TZ=Europe/Madrid, TZ=UTC.

describe("timezone helpers are machine-zone independent", () => {
  it("renders the brief's example: 17:00Z is 18:00 Madrid, 11:00 Winnipeg, 02:00+1 Tokyo", () => {
    expect(formatInZone("2026-11-02", "17:00:00", "Europe/Madrid", "HH:mm")).toBe("18:00");
    expect(formatInZone("2026-11-02", "17:00", "America/Winnipeg", "HH:mm")).toBe("11:00");
    expect(formatInZone("2026-11-02", "17:00:00", "Asia/Tokyo", "yyyy-LL-dd HH:mm")).toBe("2026-11-03 02:00");
    expect(formatInZone("2026-11-02", "17:00:00", "Asia/Kolkata", "HH:mm")).toBe("22:30");
  });

  it("zoneToUtc is the inverse of utcToZone", () => {
    for (const tz of ["Europe/Madrid", "Asia/Tokyo", "America/Los_Angeles", "Asia/Yerevan", "Australia/Sydney", "Asia/Kolkata", "America/Winnipeg"]) {
      const utc = zoneToUtc("2026-11-03", "09:00", tz);
      expect(utcToZone(utc.date, utc.time, tz).toFormat("yyyy-LL-dd HH:mm")).toBe("2026-11-03 09:00");
    }
  });

  it("keeps the teacher's 09:00 at 09:00 across both 2026 transitions and the 2027 ones", () => {
    const winnipeg = (d: string) => zoneToUtc(d, "09:00", "America/Winnipeg");
    expect(winnipeg("2026-10-30")).toEqual({ date: "2026-10-30", time: "14:00:00" }); // CDT
    expect(winnipeg("2026-11-02")).toEqual({ date: "2026-11-02", time: "15:00:00" }); // CST
    expect(winnipeg("2027-03-12")).toEqual({ date: "2027-03-12", time: "15:00:00" }); // CST
    expect(winnipeg("2027-03-15")).toEqual({ date: "2027-03-15", time: "14:00:00" }); // CDT
  });

  it("an admin edit round trip (open → save unchanged) never moves the value", () => {
    for (const [date, time] of [["2026-11-02", "15:00:00"], ["2026-10-26", "14:00:00"], ["2027-03-15", "14:00:00"]]) {
      const input = utcToZone(date, time, "America/Winnipeg").toFormat("yyyy-LL-dd'T'HH:mm");
      const [d, t] = input.split("T");
      expect(zoneToUtc(d, t, "America/Winnipeg")).toEqual({ date, time });
    }
  });

  it("formats a full ISO instant in the requested zone", () => {
    expect(formatInstantInZone("2026-11-02T23:30:00.000000Z", "Asia/Tokyo", "d LLL yyyy, HH:mm")).toBe("3 Nov 2026, 08:30");
    expect(formatInstantInZone("2026-11-02T23:30:00.000000Z", "America/Winnipeg", "d LLL yyyy, HH:mm")).toBe("2 Nov 2026, 17:30");
    expect(formatInstantInZone("2026-11-02T23:30:00.000000Z", "Europe/Madrid", "d LLL yyyy")).toBe("3 Nov 2026");
  });

  it("todayInZone follows the zone, not the machine", () => {
    const tokyo = todayInZone("Pacific/Kiritimati"); // UTC+14
    const baker = todayInZone("Etc/GMT+12"); // UTC-12
    expect(tokyo >= baker).toBe(true);
    expect(todayInZone("UTC")).toBe(new Date().toISOString().slice(0, 10));
  });

  it("detects the machine zone and lists it first", () => {
    const detected = detectTimezone();
    expect(isValidTimezone(detected)).toBe(true);
    expect(getTimezoneList(detected)[0]).toBe(detected);
    expect(new Set(getTimezoneList(detected)).size).toBe(getTimezoneList(detected).length);
    expect(isValidTimezone("Mars/Olympus")).toBe(false);
    expect(DEFAULT_TEACHER_TIMEZONE).toBe("America/Winnipeg");
  });
});

// Static guard: lesson/booking UI must not format dates with the machine's zone.
const FORBIDDEN = [/\.toLocale(Date|Time)?String\(/, /\.getHours\(|\.getMinutes\(|\.getDay\(|\.getDate\(|\.getFullYear\(/, /Date\.parse\(/, /new Date\(/];
const SCAN = ["components", "app", "libs"].map((d) => join(process.cwd(), d));
const SKIP = /Cinematic3D|Footer|articles-details|\.test\.|timezone\.ts$/;

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? (f === "node_modules" || f === ".next" ? [] : walk(p)) : /\.(ts|tsx)$/.test(f) ? [p] : [];
  });

// T13: Chrome/Edge report legacy IANA names; they must behave exactly like the canonical zone
describe("legacy zone names reported by Chrome", () => {
  const pairs = [["Asia/Calcutta", "Asia/Kolkata"], ["Europe/Kiev", "Europe/Kyiv"], ["Asia/Saigon", "Asia/Ho_Chi_Minh"]];
  for (const [legacy, canonical] of pairs) {
    it(`${legacy} = ${canonical}`, () => {
      expect(isValidTimezone(legacy)).toBe(true);
      expect(getTimezoneList(legacy)[0]).toBe(legacy);
      for (const [d, t] of [["2026-11-02", "15:00:00"], ["2027-03-15", "14:00:00"]]) {
        expect(formatInZone(d, t, legacy)).toBe(formatInZone(d, t, canonical));
      }
    });
  }
});

describe("no implicit machine-zone date APIs in booking UI", () => {
  for (const file of SCAN.flatMap(walk).filter((f) => !SKIP.test(f))) {
    it(relative(process.cwd(), file), () => {
      const src = readFileSync(file, "utf8");
      for (const re of FORBIDDEN) expect(src, `${re} in ${file}`).not.toMatch(re);
    });
  }
});
