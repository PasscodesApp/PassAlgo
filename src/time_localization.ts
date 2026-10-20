/**
 * Formats a date string into a human-readable date.
 *
 * @param isoString - A date string parseable by JavaScript's `Date` constructor,
 * such as an ISO 8601 string (`"2026-10-20T12:00:00Z"`).
 * @returns The formatted date in `MMM D, YYYY` style (e.g. `"Oct 20, 2026"`).
 *
 * @remarks
 * Uses the local timezone of the runtime environment.
 * Invalid date strings currently produce an invalid date representation.
 *
 * @example
 * formatDate("2026-10-20T12:00:00Z"); // "Oct 20, 2026" (timezone-dependent)
 * formatDate("2026-06-12 07:28:03");  // "June 12, 2026"
 */
export function formatDate(isoString: string): string {
    return formatDateValue(new Date(isoString));
}

/**
 * Formats a Unix timestamp into a human-readable date.
 *
 * @param timestamp - A Unix timestamp measured in **seconds** since
 * 1970-01-01T00:00:00Z (not milliseconds).
 * @returns The formatted date in `MMM D, YYYY` style (e.g. `"Oct 20, 2026"`).
 *
 * @remarks
 * Converts seconds to milliseconds before constructing the date.
 * Uses the local timezone of the runtime environment.
 * Invalid timestamps currently produce an invalid date representation.
 *
 * @example
 * formatTimestamp(1792454400); // "Oct 20, 2026" (timezone-dependent)
 */
export function formatTimestamp(timestamp: number): string {
    return formatDateValue(new Date(timestamp * 1000));
}

/**
 * Formats a JavaScript Date into the shared display-date format.
 *
 * @param date - The date to format.
 * @returns The formatted date in `MMM D, YYYY` style.
 * @internal
 */
function formatDateValue(date: Date): string {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ];

    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
