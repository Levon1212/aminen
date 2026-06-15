export const getImagePath = (path: string): string => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    const storageBase = (process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage').replace(/\/$/, '');
    return `${storageBase}/${path}`;
};
