export const getImagePath = (path: string): string => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    const storageBase = (process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage').replace(/\/$/, '');
    return `${storageBase}/${path}`;
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
