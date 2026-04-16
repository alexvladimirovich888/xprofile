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
    recoveryEmail: 'recovery@filmfare.com',
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
    recoveryEmail: 'backup@yoga.in'
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
    name: 'Media Outlets',
    ticker: '$NEWS',
    description: 'A collection of global news and media accounts.',
    type: 'COMMUNITY',
    pnl: '+24.5%',
    avatarUrl: 'https://picsum.photos/seed/media/400/200',
    bannerUrl: 'https://picsum.photos/seed/media-banner/1200/400',
    createdAt: '2026-04-15'
  },
  {
    id: 'p2',
    name: 'Tech Influencers',
    ticker: '$TECH',
    description: 'Top voices in technology and software engineering.',
    type: 'PERSONAL_PAGE',
    pnl: '+12.8%',
    avatarUrl: 'https://picsum.photos/seed/tech/400/200',
    bannerUrl: 'https://picsum.photos/seed/tech-banner/1200/400',
    createdAt: '2026-04-12'
  },
  {
    id: 'p3',
    name: 'Political Watch',
    ticker: '$POL',
    description: 'Key political figures and government agencies.',
    type: 'PROJECT_WITH_WEBSITE',
    pnl: '-5.2%',
    avatarUrl: 'https://picsum.photos/seed/gov/400/200',
    bannerUrl: 'https://picsum.photos/seed/gov-banner/1200/400',
    createdAt: '2026-04-10'
  },
  {
    id: 'p4',
    name: 'Crypto Analysts',
    ticker: '$CRYPTO',
    description: 'Top research and analysis accounts for crypto.',
    type: 'COMMUNITY',
    pnl: '+156.4%',
    avatarUrl: 'https://picsum.photos/seed/crypto/400/200',
    bannerUrl: 'https://picsum.photos/seed/crypto-banner/1200/400',
    createdAt: '2026-04-08'
  }
];
