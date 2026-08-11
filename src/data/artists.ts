export interface ArtistItem {
  id: string;
  name: string;
  image: string;
  category: string;
  spotifyUrl: string;
}

const SPOTIFY_URLS: Record<string, string> = {
  'abichos': 'https://open.spotify.com/artist/437FtSmpAruNj7ahaYJ3vu',
  'laura sad': 'https://open.spotify.com/artist/4IRXvbsbSP4oHm4adUdQlt',
  'shako': 'https://open.spotify.com/artist/1ha5x7opdHvL1YXQyHPjuD',
  'turrobaby': 'https://open.spotify.com/artist/3ZZY9rHZxm8lmug0aoX3pB',
  'yk its junaa': 'https://open.spotify.com/artist/4tgNxPUJKyOY0VkbzJ44iE',
  'zell': 'https://open.spotify.com/artist/0bslv0fksKPyiH3LQqHagi',
};

// Vite dynamic glob import scanning all artist images inside src/artistas/
const globImages = import.meta.glob<{ default: string }>('/src/artistas/*.{png,jpg,jpeg,jfif}', {
  eager: true,
});

// Transform glob entries into artist items
export const REAL_ARTISTS: ArtistItem[] = Object.entries(globImages).map(([path, module]) => {
  // Extract filename without directory path and extension
  const fileNameWithExt = path.split('/').pop() || '';
  const nameWithoutExt = fileNameWithExt.substring(0, fileNameWithExt.lastIndexOf('.')).trim();

  // Convert filename to clean uppercase artist name (e.g. "yk its junaa.png" -> "YK ITS JUNAA")
  const cleanName = nameWithoutExt.toUpperCase();
  const rawKey = nameWithoutExt.toLowerCase();

  return {
    id: cleanName.toLowerCase().replace(/\s+/g, '-'),
    name: cleanName,
    image: module.default || path,
    category: 'ARTIST',
    spotifyUrl: SPOTIFY_URLS[rawKey] || `https://open.spotify.com/search/${encodeURIComponent(cleanName)}`,
  };
});
