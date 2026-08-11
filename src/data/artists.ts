export interface ArtistItem {
  id: string;
  name: string;
  image: string;
  category: string;
}

// Vite dynamic glob import scanning all artist images inside src/artistas/
const globImages = import.meta.glob<{ default: string }>('/src/artistas/*.{png,jpg,jpeg,jfif}', {
  eager: true,
});

// Transform glob entries into artist items
export const REAL_ARTISTS: ArtistItem[] = Object.entries(globImages).map(([path, module]) => {
  // Extract filename without directory path and extension
  const fileNameWithExt = path.split('/').pop() || '';
  const nameWithoutExt = fileNameWithExt.substring(0, fileNameWithExt.lastIndexOf('.'));

  // Convert filename to clean uppercase artist name (e.g. "yk its junaa.png" -> "YK ITS JUNAA")
  const cleanName = nameWithoutExt.trim().toUpperCase();

  return {
    id: cleanName.toLowerCase().replace(/\s+/g, '-'),
    name: cleanName,
    image: module.default || path,
    category: 'ARTIST',
  };
});
