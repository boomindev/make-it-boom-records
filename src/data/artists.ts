export interface ArtistItem {
  id: string;
  name: string;
  image: string;
  category: string;
  spotifyUrl: string;
}

// Vite dynamic glob import scanning all artist images inside src/artistas/
const globImages = import.meta.glob<{ default: string }>('/src/artistas/*.{png,jpg,jpeg,jfif}', {
  eager: true,
});

const getImage = (fileNamePattern: string): string => {
  for (const [path, module] of Object.entries(globImages)) {
    if (path.toLowerCase().includes(fileNamePattern.toLowerCase())) {
      return module.default || path;
    }
  }
  return '';
};

export const REAL_ARTISTS: ArtistItem[] = [
  {
    id: 'abichos',
    name: 'ABICHOS',
    image: getImage('abichos') || '/src/artistas/abichos.jfif',
    category: 'ARTIST',
    spotifyUrl: 'https://open.spotify.com/artist/437FtSmpAruNj7ahaYJ3vu',
  },
  {
    id: 'salas-flaco',
    name: 'SALAS FLACO',
    image: getImage('salas flaco') || 'https://i.scdn.co/image/ab6761610000e5eb52ca36a0710dfa9a5b51847e',
    category: 'ARTIST',
    spotifyUrl: 'https://open.spotify.com/artist/35DjUjNHUUlFxsEPS3kF6a',
  },
  {
    id: 'blagh',
    name: 'BLAGH',
    image: getImage('blagh') || 'https://i.scdn.co/image/ab6761610000e5eb16eddc40f43b8c00e96391b7',
    category: 'ARTIST',
    spotifyUrl: 'https://open.spotify.com/artist/7LNIbiKKGIMlw7GjgJlR0w',
  },
  {
    id: 'sixup',
    name: 'SIXUP',
    image: getImage('sixup') || 'https://i.scdn.co/image/ab6761610000e5ebca84a4db5870ab0c543054e0',
    category: 'ARTIST',
    spotifyUrl: 'https://open.spotify.com/artist/6NhaqFskkU5O95L3JhyKyn',
  },
  {
    id: 'oney1',
    name: 'ONEY1',
    image: getImage('oney1') || 'https://i.scdn.co/image/ab6761610000e5eb761f61890cf66a3ddf71fd71',
    category: 'ARTIST',
    spotifyUrl: 'https://open.spotify.com/artist/4MOX8I8Ot0wUu4Sochsxrt',
  },
  {
    id: 'cero',
    name: 'CERO*',
    image: getImage('cero') || 'https://i.scdn.co/image/ab6761610000e5ebd6b6f88af71c91fa9b9fe08d',
    category: 'ARTIST',
    spotifyUrl: 'https://open.spotify.com/artist/2YW2jsqJMVaxPgeETV2Ttl',
  },
  {
    id: 'sarah',
    name: 'SARAH',
    image: getImage('sarah') || 'https://i.scdn.co/image/ab6761610000e5ebfdff8a9709bae94a5f2a0972',
    category: 'ARTIST',
    spotifyUrl: 'https://open.spotify.com/artist/0Jgp86iUCVU5tDyAtEoXTf?si=U9zHC4e4Rj2IB_LvkqZ-Lw',
  },
  {
    id: 'lui5',
    name: 'LUI5',
    image: getImage('lui5') || 'https://i.scdn.co/image/ab6761610000e5ebbec0330f23b1cbb53507bc3a',
    category: 'ARTIST',
    spotifyUrl: 'https://open.spotify.com/artist/0gfBmg53uxgAVNEDB23X5n?si=kay8KVZBRzuU2V-7f75a7Q',
  },
];
