export interface Artist {
  id: string;
  name: string;
  genre: string;
  origin: string;
  image: string;
  spotifyListeners: string;
  popularTrack: string;
}

export interface CountryData {
  id: string; // SVG path id or ISO code
  name: string;
  listeners: string;
  percentage: string;
  topArtist: string;
}

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  billingPeriod: string;
  popular?: boolean;
  features: string[];
}

export interface ApplicationFormData {
  type: 'artist_join' | 'demo_submission';
  fullName: string;
  artistName: string;
  email: string;
  phone: string;
  country: string;
  genre: string;
  selectedPlan: string;
  spotifyLink: string;
  instagramLink: string;
  youtubeLink: string;
  message: string;
  demoFile?: File | null;
}
