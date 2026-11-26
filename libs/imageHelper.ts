/**
 * Resolves an API image value to a `src`:
 * - Absolute URL (http/https, or protocol-relative //host): used as-is
 * - Storage-relative path ("avatars/x.jpg"): prefixed with NEXT_PUBLIC_STORAGE_URL.
 *   A leading "/", "storage/" or "storage/app/public/" is stripped first so the
 *   base is never doubled.
 */
export const getImagePath = (path: string | null | undefined): string => {
    if (!path) return '';
    if (/^https?:\/\//i.test(path) || path.startsWith('//')) return path;
    const storageBase = (process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage').replace(/\/$/, '');
    const relative = path.replace(/^\/+/, '').replace(/^storage\/(app\/public\/)?/, '');
    return `${storageBase}/${relative}`;
};

/**
 * Resolves a `settings` image value to a usable `src` string.
 * - Absolute URL (http/https): used as-is (uploaded via admin)
 * - Starts with "/": used as-is (seeded static Next.js asset path)
 * - Relative storage path: prefixed with NEXT_PUBLIC_STORAGE_URL
 * - Falsy: returns the supplied fallback
 */
export const resolveSettingImage = (
    value: string | null | undefined,
    fallback: string,
): string => {
    if (!value) return fallback;
    if (value.startsWith('http://') || value.startsWith('https://')) return value;
    if (value.startsWith('/')) return value;
    return getImagePath(value);
};
