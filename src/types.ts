export type Category = 'TECH' | 'NEWS' | 'POLITICS' | 'INFLUENCER' | 'GOV' | 'STREAMER' | 'CRYPTO' | 'GAMING';

export interface XProfile {
  id: string;
  handle: string;
  displayName: string;
  followers: number;
  category: Category;
  addedDate: string;
  avatarUrl: string;
  badge?: 'GOLD' | 'BLUE' | 'NONE';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  profileCount: number;
  updatedAt: string;
  thumbnailUrl: string;
}
