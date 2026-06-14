export const getImagePath = (path: string): string => {
    if (!path) return '';
    // Backend already returns a fully-qualified URL via asset() — use it as-is.
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }
    // Relative path (e.g. "articles/thumbnails/foo.jpg") — build full URL from API base.
    const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api').replace(/\/api\/?$/, '');
    return `${apiBase}/storage/${path}`;
};
