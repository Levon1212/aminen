export type Author = {
  name: string;
  image: string;
  bio?: string;
  _id?: number | string;
  _ref?: number | string;
};

export type Blog = {
  id: number;
  title: string;
  thumbnail: string;
  thumbnail_url: string;
  video_path?: string | null;
  video_url?: string | null;
  tags: string;
  description: string;
  created_at: string;
  updated_at: string;
};
