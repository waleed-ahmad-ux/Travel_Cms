export interface Destination {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  region: string;
  activities: string[];
}

export interface HolidayPackage {
  id: string;
  destinationId: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  imageUrl: string;
  included: string[];
  departureAirports: string[];
}

export interface Hotel {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  location: string;
  priceForTwo: number;
  pricePerPerson: number;
  nightsAndBoard: string;
  offers: string;
  destinationId: string;
  pricePerNight?: number;
  isActive?: boolean;
}

export interface SearchParams {
  destination?: string;
  airport?: string;
  startDate?: string;
  duration?: number;
  passengers?: {
    adults: number;
    children: number;
    infants: number;
  };
}

// CMS Types
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface AdminUser extends User {
  permissions: string[];
}

export interface Photo {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  thumbnailUrl?: string;
  size: number;
  mimeType: string;
  uploadedAt: string;
  uploadedBy: string;
  tags: string[];
  category: 'destination' | 'hotel' | 'activity' | 'general';
  destinationId?: string;
}

export interface FlightMargin {
  id: string;
  region: string;
  destination?: string;
  marginPercentage: number;
  fixedMargin?: number;
  seasonalMultiplier?: number;
  updatedAt: string;
  updatedBy: string;
}

export interface CMSDestination extends Destination {
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  seoTitle?: string;
  seoDescription?: string;
  about?: string;
  gallery: Photo[];
}

