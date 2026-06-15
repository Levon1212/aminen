export const getImagePath = (path: string): string => {
    if (!path) return '';
    // Backend already returns a fully-qualified URL via asset() — use it as-is.
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }
    // Relative path fallback: build full URL from explicit storage base env var.
    const storageBase = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage';
    return `${storageBase}/${path}`;
};
