import type { Destination } from '../types';

export const destinations: Destination[] = [
  // Asia
  {
    id: '1',
    name: 'Hong Kong',
    description: 'A vibrant city blending Eastern and Western cultures, famous for its skyline and cuisine.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    region: 'Asia',
    activities: ['Shopping', 'Sightseeing', 'Cuisine', 'Nightlife'],
  },
  {
    id: '2',
    name: 'Indonesia',
    description: 'An archipelago with stunning beaches, volcanoes, and diverse cultures.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    region: 'Asia',
    activities: ['Beaches', 'Surfing', 'Cultural Tours', 'Nature'],
  },
  {
    id: '3',
    name: 'Malaysia',
    description: 'A melting pot of cultures, modern cities, and beautiful islands.',
    imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
    region: 'Asia',
    activities: ['City Tours', 'Nature', 'Cuisine', 'Shopping'],
  },
  {
    id: '4',
    name: 'Singapore',
    description: 'A futuristic city-state known for its cleanliness, gardens, and food scene.',
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904',
    region: 'Asia',
    activities: ['Gardens', 'Shopping', 'Cuisine', 'Sightseeing'],
  },
  {
    id: '5',
    name: 'Thailand',
    description: 'Golden temples, tropical islands, and a perfect blend of culture and adventure.',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    region: 'Asia',
    activities: ['Temple Tours', 'Island Hopping', 'Thai Cooking', 'Beach Activities'],
  },
  // Caribbean
  {
    id: '6',
    name: 'Antigua',
    description: '365 beaches, historic harbors, and the perfect Caribbean escape.',
    imageUrl: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5',
    region: 'Caribbean',
    activities: ['Beach Hopping', 'Sailing', 'Historical Tours', 'Water Sports'],
  },
  {
    id: '7',
    name: 'Bahamas',
    description: 'Crystal-clear waters, white sand beaches, and vibrant marine life.',
    imageUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368',
    region: 'Caribbean',
    activities: ['Snorkeling', 'Beaches', 'Boating', 'Resorts'],
  },
  {
    id: '8',
    name: 'Cuba',
    description: 'Colorful streets, classic cars, and rich history in the heart of the Caribbean.',
    imageUrl: 'https://images.unsplash.com/photo-1464983953574-0892a716854b',
    region: 'Caribbean',
    activities: ['Cultural Tours', 'Beaches', 'Music', 'History'],
  },
  {
    id: '9',
    name: 'Jamaica',
    description: 'Reggae culture, stunning waterfalls, and warm Caribbean hospitality.',
    imageUrl: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5',
    region: 'Caribbean',
    activities: ['Waterfall Tours', 'Reggae Music', 'Beach Activities', 'Adventure Sports'],
  },
  {
    id: '10',
    name: 'St Lucia',
    description: 'Dramatic Pitons, lush rainforests, and pristine beaches.',
    imageUrl: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5',
    region: 'Caribbean',
    activities: ['Hiking the Pitons', 'Rainforest Tours', 'Beach Activities', 'Spa & Wellness'],
  },
  {
    id: '11',
    name: 'Trinidad and Tobago',
    description: 'A twin-island nation with vibrant festivals, beaches, and diverse wildlife.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    region: 'Caribbean',
    activities: ['Carnival', 'Beaches', 'Wildlife', 'Cultural Tours'],
  },
  // Europe
  {
    id: '12',
    name: 'Cyprus',
    description: 'Mediterranean beaches, ancient ruins, and charming villages.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    region: 'Europe',
    activities: ['Beaches', 'History', 'Village Tours', 'Cuisine'],
  },
  {
    id: '13',
    name: 'Greece',
    description: 'Ancient history, stunning islands, and Mediterranean charm.',
    imageUrl: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e',
    region: 'Europe',
    activities: ['Historical Tours', 'Island Hopping', 'Beach Activities', 'Wine Tasting'],
  },
  {
    id: '14',
    name: 'Malta',
    description: 'Historic sites, beautiful coastlines, and a unique blend of cultures.',
    imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
    region: 'Europe',
    activities: ['History', 'Beaches', 'Cultural Tours', 'Cuisine'],
  },
  {
    id: '15',
    name: 'Portugal',
    description: 'Golden beaches, historic cities, and world-renowned cuisine.',
    imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
    region: 'Europe',
    activities: ['Beaches', 'City Tours', 'Cuisine', 'Wine Tasting'],
  },
  {
    id: '16',
    name: 'Spain',
    description: 'Vibrant culture, stunning architecture, and beautiful beaches.',
    imageUrl: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e',
    region: 'Europe',
    activities: ['Cultural Tours', 'Beach Activities', 'Food & Wine', 'Architecture Tours'],
  },
  {
    id: '17',
    name: 'Tenerife',
    description: "The largest of Spain's Canary Islands, known for its beaches and volcanic landscapes.",
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    region: 'Europe',
    activities: ['Beaches', 'Volcano Tours', 'Nature', 'Water Sports'],
  },
  {
    id: '18',
    name: 'Türkiye',
    description: 'A crossroads of Europe and Asia, rich in history, culture, and cuisine.',
    imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
    region: 'Europe',
    activities: ['Historical Tours', 'Cuisine', 'City Tours', 'Beaches'],
  },
  // Middle East
  {
    id: '19',
    name: 'UAE',
    description: 'A modern oasis in the desert, home to Dubai and Abu Dhabi, luxury shopping, and adventure.',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
    region: 'Middle East',
    activities: ['Desert Safari', 'Shopping', 'Skydiving', 'Architecture Tours'],
  },
];

export const getDestinationById = (id: string): Destination | undefined => {
  return destinations.find((dest) => dest.id === id);
};

export const searchDestinations = (
  query: string,
  region?: string
): Destination[] => {
  return destinations.filter((dest) => {
    const matchesQuery = dest.name.toLowerCase().includes(query.toLowerCase()) ||
      dest.description.toLowerCase().includes(query.toLowerCase());
    const matchesRegion = !region || dest.region === region;
    
    return matchesQuery && matchesRegion;
  });
};
