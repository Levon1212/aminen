export type VideoItem = {
  path: string;
  is_preview: boolean;
};

export type OnlineLesson = {
  id: number;
  title: string;
  description: string | null;
  price: number;
  status: string;
  tags: string | null;
  thumbnail: string | null;
  thumbnail_url: string | null;
  videos: VideoItem[];
  stream_urls: string[];
  is_purchased: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};
