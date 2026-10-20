/**
 * Formats a number using the US English locale.
 *
 * @param num - The number to format.
 * @returns The number formatted with US English grouping separators.
 *
 * @example
 * formatNumber(1234567.89); // "1,234,567.89"
 */
export function formatNumber(num: number): string {
    return new Intl.NumberFormat("en-US").format(num);
}

/**
 * Formats a file size using binary units (base 1024).
 *
 * @param bytes - The file size in bytes. Expected to be non-negative.
 * @returns The formatted size using B, KB, MB, or GB.
 *
 * @remarks
 * Bytes are displayed without decimal places; larger units use one decimal
 * place. This function currently supports sizes up to GB.
 *
 * @example
 * formatFileSize(0);       // "0 B"
 * formatFileSize(512);     // "512 B"
 * formatFileSize(1536);    // "1.5 KB"
 * formatFileSize(1048576); // "1.0 MB"
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 B";

    const units = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = (bytes / Math.pow(1024, i)).toFixed(i > 0 ? 1 : 0);

    return `${size} ${units[i]}`;
}
