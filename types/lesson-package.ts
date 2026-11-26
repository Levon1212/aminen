export type LessonPackage = {
  id: number;
  name: string;
  description: string | null;
  lessons_count: number;
  price: number;
  price_per_lesson: number;
  validity_days: number;
  is_active: boolean;
  sort_order: number;
};

// GET /profile/package — the user's earliest-expiring package with lessons left, or null
export type ActivePackage = {
  id: number;
  lessons_total: number;
  lessons_remaining: number;
  activated_at: string;
  expires_at: string;
  package: { name: string | null };
};
