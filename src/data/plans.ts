import { CountryData, Plan } from '../types';

export const COUNTRIES_DATA: Record<string, CountryData> = {
  DO: {
    id: 'DO',
    name: 'DOMINICAN REPUBLIC',
    listeners: '12.4K',
    percentage: '14.2%',
    topArtist: 'NOCTURNE RAYS'
  },
  US: {
    id: 'US',
    name: 'UNITED STATES',
    listeners: '84.2K',
    percentage: '32.5%',
    topArtist: 'KAIRO'
  },
  ES: {
    id: 'ES',
    name: 'SPAIN',
    listeners: '31.7K',
    percentage: '18.4%',
    topArtist: 'MAJESTY'
  },
  MX: {
    id: 'MX',
    name: 'MEXICO',
    listeners: '28.5K',
    percentage: '15.1%',
    topArtist: 'MAJESTY'
  },
  GB: {
    id: 'GB',
    name: 'UNITED KINGDOM',
    listeners: '22.1K',
    percentage: '11.8%',
    topArtist: 'AURA VIOLET'
  },
  DE: {
    id: 'DE',
    name: 'GERMANY',
    listeners: '19.4K',
    percentage: '9.6%',
    topArtist: 'VEXEN'
  },
  CO: {
    id: 'CO',
    name: 'COLOMBIA',
    listeners: '16.8K',
    percentage: '8.2%',
    topArtist: 'NOCTURNE RAYS'
  },
  BR: {
    id: 'BR',
    name: 'BRAZIL',
    listeners: '25.3K',
    percentage: '12.7%',
    topArtist: 'KINETIC ECHO'
  },
  JP: {
    id: 'JP',
    name: 'JAPAN',
    listeners: '18.9K',
    percentage: '9.1%',
    topArtist: 'KINETIC ECHO'
  },
  FR: {
    id: 'FR',
    name: 'FRANCE',
    listeners: '15.2K',
    percentage: '7.5%',
    topArtist: 'VEXEN'
  }
};

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'STARTER',
    tagline: 'For artists who are just getting started.',
    price: '$29',
    billingPeriod: '/ month',
    features: [
      'Global Digital Distribution',
      'Official Artist Profile Setup',
      'Basic Performance Support',
      'Basic Monthly Royalty Reports',
      'Standard Delivery to 150+ Platforms'
    ]
  },
  {
    id: 'professional',
    name: 'PROFESSIONAL',
    tagline: 'For artists ready to grow their audience worldwide.',
    price: '$79',
    billingPeriod: '/ month',
    popular: true,
    features: [
      'Everything in Starter',
      'Official Playlist Pitching (Spotify/Apple)',
      'Social Media Marketing Support',
      'Priority Artist Support (24/7)',
      'Advanced Analytics & Listener Insights',
      'Sync Licensing Consideration'
    ]
  },
  {
    id: 'elite',
    name: 'ELITE',
    tagline: 'For established artists taking their career further.',
    price: '$199',
    billingPeriod: '/ month',
    features: [
      'Everything in Professional',
      'Dedicated PR & Marketing Campaigns',
      'Global Playlist & Radio Pitching',
      '1-on-1 Monthly Career Consultation',
      'Exclusive Touring & Booking Connections',
      'Priority Master Distribution'
    ]
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    tagline: 'For top-tier artists looking for full-service label support.',
    price: '$499',
    billingPeriod: '/ month',
    features: [
      'Everything in Elite',
      'Personalized Global Release Strategy',
      'Dedicated Senior Label Manager',
      'In-House Content & Artwork Production',
      'VIP Event & Festival Placement Access',
      'Custom Sync & Brand Partnership Deals'
    ]
  }
];

export const SOCIALS = [
  { name: 'Spotify', handle: '@makeitboomrecords', url: 'https://spotify.com' },
  { name: 'Apple Music', handle: 'Make It Boom Records', url: 'https://music.apple.com' },
  { name: 'TikTok', handle: '@makeitboomrec', url: 'https://tiktok.com' },
  { name: 'Instagram', handle: '@makeitboomrecords', url: 'https://instagram.com' },
  { name: 'Amazon Music', handle: 'Make It Boom Records', url: 'https://music.amazon.com' },
  { name: 'YouTube', handle: 'MakeItBoomRecords', url: 'https://youtube.com' }
];
