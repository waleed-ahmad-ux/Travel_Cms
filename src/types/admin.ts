// Admin-specific types
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
