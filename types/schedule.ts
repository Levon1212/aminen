export interface PrivateLessonSchedule {
  id?: number;
  full_name: string;
  email: string;
  phone_number: string;
  message: string;
  date: string;
  time: string;
  timezone: string;
  country: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
  duration?: number;
  created_at?: string;
  updated_at?: string;
}
