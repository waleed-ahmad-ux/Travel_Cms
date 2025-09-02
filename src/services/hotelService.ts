import type { Hotel } from '../types/index';

export const hotels: Hotel[] = [
  {
    id: 'h1',
    name: 'Colony Club, a Luxury Collection Resort',
    imageUrl: 'https://images.unsplash.com/photo-1571003123894-ea4609634e2c?auto=format&fit=crop&w=800&q=80',
    rating: 5,
    location: 'West Coast',
    priceForTwo: 3158,
    pricePerPerson: 1579,
    nightsAndBoard: '7 NIGHTS BED AND BREAKFAST',
    offers: '37% Discount (Travel from 04/09/2025)',
    destinationId: '7', // Barbados
  },
  {
    id: 'h2',
    name: 'Bougainvillea Barbados',
    imageUrl: 'https://images.unsplash.com/photo-1596386828807-61c1a2f6c9d2?auto=format&fit=crop&w=800&q=80',
    rating: 4,
    location: 'South Coast',
    priceForTwo: 2500,
    pricePerPerson: 1250,
    nightsAndBoard: '5 NIGHTS ALL INCLUSIVE',
    offers: 'Early Bird Offer',
    destinationId: '7', // Barbados
  },
  {
    id: 'h3',
    name: 'Butterfly Beach Hotel',
    imageUrl: 'https://images.unsplash.com/photo-1522880894749-ed6a12b9a7f3?auto=format&fit=crop&w=800&q=80',
    rating: 3,
    location: 'South Coast',
    priceForTwo: 1800,
    pricePerPerson: 900,
    nightsAndBoard: '3 NIGHTS ROOM ONLY',
    offers: 'Last Minute Deal',
    destinationId: '7', // Barbados
  },
  {
    id: 'h4',
    name: 'Cobblers Cove',
    imageUrl: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=800&q=80',
    rating: 5,
    location: 'West Coast',
    priceForTwo: 4000,
    pricePerPerson: 2000,
    nightsAndBoard: '7 NIGHTS BED AND BREAKFAST',
    offers: 'Luxury Package',
    destinationId: '6', // Antigua
  },
  {
    id: 'h5',
    name: 'Coconut Court Beach Hotel',
    imageUrl: 'https://images.unsplash.com/photo-1517849646878-c51804b865d4?auto=format&fit=crop&w=800&q=80',
    rating: 4,
    location: 'South Coast',
    priceForTwo: 2200,
    pricePerPerson: 1100,
    nightsAndBoard: '5 NIGHTS ALL INCLUSIVE',
    offers: 'Family Fun Package',
    destinationId: '7', // Barbados
  },
  {
    id: 'h6',
    name: 'Atlantis The Palm',
    imageUrl: 'https://images.unsplash.com/photo-1582298730999-556133d59663?auto=format&fit=crop&w=800&q=80',
    rating: 5,
    location: 'Palm Jumeirah',
    priceForTwo: 5000,
    pricePerPerson: 2500,
    nightsAndBoard: '4 NIGHTS HALF BOARD',
    offers: 'Waterpark Access',
    destinationId: '4', // Dubai
  },
  {
    id: 'h7',
    name: 'Burj Al Arab Jumeirah',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    rating: 5,
    location: 'Jumeirah Beach',
    priceForTwo: 8000,
    pricePerPerson: 4000,
    nightsAndBoard: '3 NIGHTS BED AND BREAKFAST',
    offers: 'Butler Service',
    destinationId: '4', // Dubai
  },
  {
    id: 'h8',
    name: 'The St. Regis Maldives Vommuli Resort',
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    rating: 5,
    location: 'Dhaalu Atoll',
    priceForTwo: 7000,
    pricePerPerson: 3500,
    nightsAndBoard: '7 NIGHTS ALL INCLUSIVE',
    offers: 'Overwater Villa Special',
    destinationId: '1', // Maldives
  },
  {
    id: 'h_jamaica_1',
    name: 'Montego Bay Resort',
    imageUrl: 'https://images.unsplash.com/photo-1517849646878-c51804b865d4?auto=format&fit=crop&w=800&q=80',
    rating: 4,
    location: 'Montego Bay',
    priceForTwo: 3200,
    pricePerPerson: 1600,
    nightsAndBoard: '7 NIGHTS ALL INCLUSIVE',
    offers: 'Family Fun Package',
    destinationId: '9', // Jamaica
  },
  {
    id: 'h_stlucia_1',
    name: 'Pitons View Hotel',
    imageUrl: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=800&q=80',
    rating: 5,
    location: 'Soufriere',
    priceForTwo: 4500,
    pricePerPerson: 2250,
    nightsAndBoard: '7 NIGHTS BED AND BREAKFAST',
    offers: 'Luxury Package',
    destinationId: '10', // St Lucia
  },
  {
    id: 'h_cyprus_1',
    name: 'Limassol Beach Resort',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    rating: 4,
    location: 'Limassol',
    priceForTwo: 2800,
    pricePerPerson: 1400,
    nightsAndBoard: '5 NIGHTS ALL INCLUSIVE',
    offers: 'Early Bird Offer',
    destinationId: '12', // Cyprus
  },
  {
    id: 'h_greece_1',
    name: 'Santorini Sunset Suites',
    imageUrl: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=800&q=80',
    rating: 5,
    location: 'Santorini',
    priceForTwo: 5000,
    pricePerPerson: 2500,
    nightsAndBoard: '7 NIGHTS ALL INCLUSIVE',
    offers: 'Overwater Villa Special',
    destinationId: '13', // Greece
  },
];

export const getHotelsByDestinationId = (destinationId: string): Hotel[] => {
  return hotels.filter(hotel => hotel.destinationId === destinationId);
};

export const searchHotels = (
  destinationId: string,
  query: string = '',
  minRating: number | null = null,
  hotelName: string = '',
): Hotel[] => {
  let filtered = hotels.filter(hotel => hotel.destinationId === destinationId);

  if (query) {
    filtered = filtered.filter(hotel =>
      hotel.name.toLowerCase().includes(query.toLowerCase()) ||
      hotel.location.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (minRating !== null) {
    filtered = filtered.filter(hotel => hotel.rating >= minRating);
  }

  if (hotelName) {
    filtered = filtered.filter(hotel => hotel.name.toLowerCase().includes(hotelName.toLowerCase()));
  }

  return filtered;
}; 