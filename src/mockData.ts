import { XProfile, Project } from './types';

export const mockProfiles: XProfile[] = [
  {
    id: '1',
    handle: 'filmfare',
    displayName: 'Filmfare',
    followers: 6329093,
    category: 'TECH',
    addedDate: '2026-04-01',
    avatarUrl: 'https://picsum.photos/seed/filmfare/100/100',
    badge: 'GOLD',
    status: 'ACTIVE',
    email: 'admin@filmfare.com',
    password: 'secret_password_123',
    twoFactorSeed: 'JBSWY3DPEHPK3PXP',
    notes: 'Premium account'
  },
  {
    id: '2',
    handle: 'CNNChile',
    displayName: 'CNN Chile',
    followers: 4076952,
    category: 'NEWS',
    addedDate: '2026-04-10',
    avatarUrl: 'https://picsum.photos/seed/cnn/100/100',
    badge: 'BLUE',
    status: 'ACTIVE',
    email: 'contact@cnnchile.cl',
    password: 'chile_news_2026',
    notes: 'Official channel'
  },
  {
    id: '3',
    handle: 'NASA_Community',
    displayName: 'NASA Community',
    followers: 2618347,
    category: 'TECH',
    addedDate: '2026-04-01',
    avatarUrl: 'https://picsum.photos/seed/nasa/100/100',
    status: 'BANNED',
    email: 'community@nasa.gov',
    password: 'mars_landing_99',
    notes: 'Violation of policy'
  },
  {
    id: '4',
    handle: 'ZambelliRita',
    displayName: 'Carla Zambelli',
    followers: 2617605,
    category: 'POLITICS',
    addedDate: '2026-03-12',
    avatarUrl: 'https://picsum.photos/seed/rita/100/100',
    status: 'ACTIVE',
    email: 'carla@zambelli.br',
    password: 'brasil_politics_01'
  },
  {
    id: '5',
    handle: 'yogishiramdev',
    displayName: 'स्वामी रामदेव',
    followers: 2461926,
    category: 'INFLUENCER',
    addedDate: '2026-03-17',
    avatarUrl: 'https://picsum.photos/seed/yogi/100/100',
    badge: 'BLUE',
    status: 'ACTIVE',
    email: 'ramdev@yoga.in',
    password: 'yoga_life_108',
    twoFactorSeed: 'KRSXG5CTKPSXG5CT'
  },
  {
    id: '6',
    handle: 'FortuneMagazine',
    displayName: 'FORTUNE',
    followers: 2250399,
    category: 'NEWS',
    addedDate: '2026-03-12',
    avatarUrl: 'https://picsum.photos/seed/fortune/100/100',
    badge: 'GOLD',
    status: 'ACTIVE',
    email: 'editorial@fortune.com',
    password: 'wealth_mag_xyz'
  },
  {
    id: '7',
    handle: 'DCI_Kenya',
    displayName: 'DCI KENYA',
    followers: 1970974,
    category: 'GOV',
    addedDate: '2026-03-12',
    avatarUrl: 'https://picsum.photos/seed/kenya/100/100',
    badge: 'BLUE',
    status: 'ACTIVE',
    email: 'info@dci.go.ke',
    password: 'safiri_kenya_55'
  },
  {
    id: '8',
    handle: 'marcelamcgowan',
    displayName: 'Macela Mc Gowan',
    followers: 909617,
    category: 'INFLUENCER',
    addedDate: '2026-03-17',
    avatarUrl: 'https://picsum.photos/seed/marcela/100/100',
    badge: 'BLUE',
    status: 'ACTIVE',
    email: 'marcela@mcgowan.id',
    password: 'influencer_joy_77'
  }
];

export const mockProjects: Project[] = [
  {
    id: 'p1',
    title: 'Media Outlets',
    description: 'A collection of global news and media accounts.',
    profileCount: 124,
    updatedAt: '2026-04-15',
    thumbnailUrl: 'https://picsum.photos/seed/media/400/200'
  },
  {
    id: 'p2',
    title: 'Tech Influencers',
    description: 'Top voices in technology and software engineering.',
    profileCount: 45,
    updatedAt: '2026-04-12',
    thumbnailUrl: 'https://picsum.photos/seed/tech/400/200'
  },
  {
    id: 'p3',
    title: 'Political Watch',
    description: 'Key political figures and government agencies.',
    profileCount: 88,
    updatedAt: '2026-04-10',
    thumbnailUrl: 'https://picsum.photos/seed/gov/400/200'
  },
  {
    id: 'p4',
    title: 'Crypto Analysts',
    description: 'Top research and analysis accounts for crypto.',
    profileCount: 32,
    updatedAt: '2026-04-08',
    thumbnailUrl: 'https://picsum.photos/seed/crypto/400/200'
  }
];
