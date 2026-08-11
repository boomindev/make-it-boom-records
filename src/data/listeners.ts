/**
 * Listener data keyed by ISO 3166-1 Alpha-3 country codes
 * (react-simple-maps/Natural Earth uses Alpha-3)
 */

export interface ListenerEntry {
  name: string;
  listeners: number;
  percentage: number;
  topArtist: string;
}

export const LISTENER_DATA: Record<string, ListenerEntry> = {
  // ── Americas ──────────────────────────────────
  USA: { name: 'UNITED STATES',       listeners: 84200,  percentage: 22.4, topArtist: 'KAIRO' },
  DOM: { name: 'DOMINICAN REPUBLIC',  listeners: 12400,  percentage: 3.3,  topArtist: 'NOCTURNE RAYS' },
  MEX: { name: 'MEXICO',              listeners: 28500,  percentage: 7.6,  topArtist: 'MAJESTY' },
  COL: { name: 'COLOMBIA',            listeners: 16800,  percentage: 4.5,  topArtist: 'NOCTURNE RAYS' },
  BRA: { name: 'BRAZIL',              listeners: 25300,  percentage: 6.7,  topArtist: 'KINETIC ECHO' },
  ARG: { name: 'ARGENTINA',           listeners: 11200,  percentage: 3.0,  topArtist: 'MAJESTY' },
  CHL: { name: 'CHILE',               listeners: 7800,   percentage: 2.1,  topArtist: 'MAJESTY' },
  PER: { name: 'PERU',                listeners: 6100,   percentage: 1.6,  topArtist: 'NOCTURNE RAYS' },
  CAN: { name: 'CANADA',              listeners: 14600,  percentage: 3.9,  topArtist: 'KAIRO' },
  PRI: { name: 'PUERTO RICO',         listeners: 9400,   percentage: 2.5,  topArtist: 'MAJESTY' },
  ECU: { name: 'ECUADOR',             listeners: 3200,   percentage: 0.9,  topArtist: 'NOCTURNE RAYS' },
  VEN: { name: 'VENEZUELA',           listeners: 2800,   percentage: 0.7,  topArtist: 'NOCTURNE RAYS' },
  CRI: { name: 'COSTA RICA',          listeners: 2100,   percentage: 0.6,  topArtist: 'MAJESTY' },
  PAN: { name: 'PANAMA',              listeners: 1900,   percentage: 0.5,  topArtist: 'NOCTURNE RAYS' },
  GTM: { name: 'GUATEMALA',           listeners: 1700,   percentage: 0.5,  topArtist: 'MAJESTY' },
  CUB: { name: 'CUBA',                listeners: 1400,   percentage: 0.4,  topArtist: 'NOCTURNE RAYS' },
  BOL: { name: 'BOLIVIA',             listeners: 1100,   percentage: 0.3,  topArtist: 'NOCTURNE RAYS' },
  URY: { name: 'URUGUAY',             listeners: 2400,   percentage: 0.6,  topArtist: 'MAJESTY' },
  PRY: { name: 'PARAGUAY',            listeners: 900,    percentage: 0.2,  topArtist: 'MAJESTY' },
  HND: { name: 'HONDURAS',            listeners: 1200,   percentage: 0.3,  topArtist: 'NOCTURNE RAYS' },
  SLV: { name: 'EL SALVADOR',         listeners: 1000,   percentage: 0.3,  topArtist: 'NOCTURNE RAYS' },
  NIC: { name: 'NICARAGUA',           listeners: 800,    percentage: 0.2,  topArtist: 'MAJESTY' },
  JAM: { name: 'JAMAICA',             listeners: 1500,   percentage: 0.4,  topArtist: 'KAIRO' },
  HTI: { name: 'HAITI',               listeners: 700,    percentage: 0.2,  topArtist: 'NOCTURNE RAYS' },

  // ── Europe ────────────────────────────────────
  ESP: { name: 'SPAIN',               listeners: 31700,  percentage: 8.4,  topArtist: 'MAJESTY' },
  GBR: { name: 'UNITED KINGDOM',      listeners: 22100,  percentage: 5.9,  topArtist: 'AURA VIOLET' },
  DEU: { name: 'GERMANY',             listeners: 19400,  percentage: 5.2,  topArtist: 'VEXEN' },
  FRA: { name: 'FRANCE',              listeners: 15200,  percentage: 4.0,  topArtist: 'VEXEN' },
  ITA: { name: 'ITALY',               listeners: 12800,  percentage: 3.4,  topArtist: 'AURA VIOLET' },
  NLD: { name: 'NETHERLANDS',         listeners: 10400,  percentage: 2.8,  topArtist: 'VEXEN' },
  PRT: { name: 'PORTUGAL',            listeners: 8200,   percentage: 2.2,  topArtist: 'MAJESTY' },
  SWE: { name: 'SWEDEN',              listeners: 7600,   percentage: 2.0,  topArtist: 'VEXEN' },
  NOR: { name: 'NORWAY',              listeners: 4800,   percentage: 1.3,  topArtist: 'VEXEN' },
  CHE: { name: 'SWITZERLAND',         listeners: 5100,   percentage: 1.4,  topArtist: 'VEXEN' },
  BEL: { name: 'BELGIUM',             listeners: 4200,   percentage: 1.1,  topArtist: 'VEXEN' },
  AUT: { name: 'AUSTRIA',             listeners: 3600,   percentage: 1.0,  topArtist: 'VEXEN' },
  POL: { name: 'POLAND',              listeners: 6200,   percentage: 1.7,  topArtist: 'VEXEN' },
  ROU: { name: 'ROMANIA',             listeners: 2800,   percentage: 0.7,  topArtist: 'AURA VIOLET' },
  GRC: { name: 'GREECE',              listeners: 3100,   percentage: 0.8,  topArtist: 'AURA VIOLET' },
  IRL: { name: 'IRELAND',             listeners: 3400,   percentage: 0.9,  topArtist: 'AURA VIOLET' },
  DNK: { name: 'DENMARK',             listeners: 3800,   percentage: 1.0,  topArtist: 'VEXEN' },
  FIN: { name: 'FINLAND',             listeners: 2600,   percentage: 0.7,  topArtist: 'VEXEN' },
  CZE: { name: 'CZECHIA',             listeners: 2200,   percentage: 0.6,  topArtist: 'VEXEN' },
  HUN: { name: 'HUNGARY',             listeners: 1800,   percentage: 0.5,  topArtist: 'VEXEN' },
  RUS: { name: 'RUSSIA',              listeners: 5400,   percentage: 1.4,  topArtist: 'KINETIC ECHO' },
  UKR: { name: 'UKRAINE',             listeners: 2400,   percentage: 0.6,  topArtist: 'VEXEN' },

  // ── Asia & Pacific ────────────────────────────
  JPN: { name: 'JAPAN',               listeners: 18900,  percentage: 5.0,  topArtist: 'KINETIC ECHO' },
  KOR: { name: 'SOUTH KOREA',         listeners: 9800,   percentage: 2.6,  topArtist: 'KINETIC ECHO' },
  AUS: { name: 'AUSTRALIA',           listeners: 8600,   percentage: 2.3,  topArtist: 'AURA VIOLET' },
  NZL: { name: 'NEW ZEALAND',         listeners: 2400,   percentage: 0.6,  topArtist: 'AURA VIOLET' },
  IND: { name: 'INDIA',               listeners: 6800,   percentage: 1.8,  topArtist: 'KINETIC ECHO' },
  PHL: { name: 'PHILIPPINES',         listeners: 5200,   percentage: 1.4,  topArtist: 'KINETIC ECHO' },
  IDN: { name: 'INDONESIA',           listeners: 4100,   percentage: 1.1,  topArtist: 'KINETIC ECHO' },
  THA: { name: 'THAILAND',            listeners: 3600,   percentage: 1.0,  topArtist: 'KINETIC ECHO' },
  CHN: { name: 'CHINA',               listeners: 7200,   percentage: 1.9,  topArtist: 'KINETIC ECHO' },
  TWN: { name: 'TAIWAN',              listeners: 2800,   percentage: 0.7,  topArtist: 'KINETIC ECHO' },
  SGP: { name: 'SINGAPORE',           listeners: 3200,   percentage: 0.9,  topArtist: 'KINETIC ECHO' },
  MYS: { name: 'MALAYSIA',            listeners: 2600,   percentage: 0.7,  topArtist: 'KINETIC ECHO' },
  VNM: { name: 'VIETNAM',             listeners: 1800,   percentage: 0.5,  topArtist: 'KINETIC ECHO' },

  // ── Middle East & Africa ──────────────────────
  ARE: { name: 'UNITED ARAB EMIRATES', listeners: 4800,  percentage: 1.3,  topArtist: 'AURA VIOLET' },
  SAU: { name: 'SAUDI ARABIA',        listeners: 3200,   percentage: 0.9,  topArtist: 'AURA VIOLET' },
  ISR: { name: 'ISRAEL',              listeners: 2800,   percentage: 0.7,  topArtist: 'VEXEN' },
  TUR: { name: 'TURKEY',              listeners: 5600,   percentage: 1.5,  topArtist: 'VEXEN' },
  ZAF: { name: 'SOUTH AFRICA',        listeners: 4200,   percentage: 1.1,  topArtist: 'AURA VIOLET' },
  NGA: { name: 'NIGERIA',             listeners: 3400,   percentage: 0.9,  topArtist: 'KAIRO' },
  EGY: { name: 'EGYPT',               listeners: 2100,   percentage: 0.6,  topArtist: 'AURA VIOLET' },
  MAR: { name: 'MOROCCO',             listeners: 1900,   percentage: 0.5,  topArtist: 'MAJESTY' },
  KEN: { name: 'KENYA',               listeners: 1600,   percentage: 0.4,  topArtist: 'KAIRO' },
  GHA: { name: 'GHANA',               listeners: 1200,   percentage: 0.3,  topArtist: 'KAIRO' },
};

/** Format 12400 → "12,400" */
export function formatListeners(n: number): string {
  return n.toLocaleString('en-US');
}

/** Countries with >= this threshold get a glowing activity pulse dot */
export const PULSE_THRESHOLD = 10000;

/** Top 10 listener countries for the sidebar stats */
export function getTopCountries(count = 10): (ListenerEntry & { iso: string })[] {
  return Object.entries(LISTENER_DATA)
    .map(([iso, data]) => ({ ...data, iso }))
    .sort((a, b) => b.listeners - a.listeners)
    .slice(0, count);
}
