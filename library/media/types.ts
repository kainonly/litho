export type Media = Picture | Video;
export type MediaType = 'pictures' | 'videos';

export interface Picture {
  name: string;
  url: string;
  params?: Record<string, string>;
  tags?: string[];
}

export interface Video {
  name: string;
  url: string;
  tags?: string[];
}
