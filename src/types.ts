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
  status: 'ACTIVE' | 'BANNED';
  email?: string;
  password?: string;
  recoveryEmail?: string;
  profileUrl?: string;
  notes?: string;
}

export type ProjectType = 'COMMUNITY' | 'PERSONAL_PAGE' | 'PROJECT_WITH_WEBSITE';

export interface Project {
  id: string;
  name: string;
  ticker: string;
  description: string;
  type: ProjectType;
  pnl: string;
  avatarUrl: string;
  bannerUrl: string;
  createdAt: string;
  email?: string;
  password?: string;
  recoveryEmail?: string;
  websiteUrl?: string;
}
