import type { Photo, User, FlightMargin, PackageMargin, HotelMargin } from '../types/admin';
import type { Hotel } from '../types/index';
import { hotels } from './hotelService';
import { v4 as uuidv4 } from 'uuid';

// Mock data storage - in a real app, this would be API calls
let mockPhotos: Photo[] = [];
let mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@travelsite.com',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: '2',
    username: 'editor',
    email: 'editor@travelsite.com',
    role: 'editor',
    createdAt: '2024-01-02T00:00:00Z',
    isActive: true
  }
];

let mockFlightMargins: FlightMargin[] = [
  {
    id: '1',
    region: 'All',
    marginPercentage: 15,
    updatedAt: new Date().toISOString(),
    updatedBy: 'admin'
  }
];

let mockPackageMargins: PackageMargin[] = [
  {
    id: '1',
    region: 'All',
    marginPercentage: 12,
    rating: '5 Star',
    updatedAt: new Date().toISOString(),
    updatedBy: 'admin'
  },
  {
    id: '2',
    region: 'All',
    marginPercentage: 10,
    rating: '4 Star',
    updatedAt: new Date().toISOString(),
    updatedBy: 'admin'
  },
  {
    id: '3',
    region: 'All',
    marginPercentage: 8,
    rating: '3 Star',
    updatedAt: new Date().toISOString(),
    updatedBy: 'admin'
  }
];

let mockHotelMargins: HotelMargin[] = [
  {
    id: '1',
    region: 'All',
    marginPercentage: 10,
    rating: '5 Star',
    updatedAt: new Date().toISOString(),
    updatedBy: 'admin'
  },
  {
    id: '2',
    region: 'All',
    marginPercentage: 8,
    rating: '4 Star',
    updatedAt: new Date().toISOString(),
    updatedBy: 'admin'
  },
  {
    id: '3',
    region: 'All',
    marginPercentage: 6,
    rating: '3 Star',
    updatedAt: new Date().toISOString(),
    updatedBy: 'admin'
  }
];


// Photo Management
export const photoService = {
  async getPhotos(category?: string, destinationId?: string): Promise<Photo[]> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    let filtered = [...mockPhotos];
    
    if (category) {
      filtered = filtered.filter(photo => photo.category === category);
    }
    
    if (destinationId) {
      filtered = filtered.filter(photo => photo.destinationId === destinationId);
    }
    
    return filtered;
  },

  async uploadPhoto(file: File, category: string, tags: string[], destinationId?: string): Promise<Photo> {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate upload
    
    const photo: Photo = {
      id: uuidv4(),
      filename: `${Date.now()}_${file.name}`,
      originalName: file.name,
      url: URL.createObjectURL(file),
      size: file.size,
      mimeType: file.type,
      uploadedAt: new Date().toISOString(),
      uploadedBy: 'admin',
      tags,
      category: category as Photo['category'],
      destinationId
    };
    
    mockPhotos.push(photo);
    return photo;
  },

  async deletePhoto(photoId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    mockPhotos = mockPhotos.filter(photo => photo.id !== photoId);
  },

  async updatePhoto(photoId: string, updates: Partial<Photo>): Promise<Photo> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockPhotos.findIndex(photo => photo.id === photoId);
    if (index === -1) throw new Error('Photo not found');
    
    mockPhotos[index] = { ...mockPhotos[index], ...updates };
    return mockPhotos[index];
  }
};

// User Management
export const userService = {
  async getUsers(): Promise<User[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockUsers];
  },

  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user: User = {
      ...userData,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    
    mockUsers.push(user);
    return user;
  },

  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockUsers.findIndex(user => user.id === userId);
    if (index === -1) throw new Error('User not found');
    
    mockUsers[index] = { ...mockUsers[index], ...updates };
    return mockUsers[index];
  },

  async deleteUser(userId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    mockUsers = mockUsers.filter(user => user.id !== userId);
  }
};

// Flight Margin Management
export const flightMarginService = {
  async getFlightMargins(): Promise<FlightMargin[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockFlightMargins];
  },

  async createFlightMargin(marginData: Omit<FlightMargin, 'id' | 'updatedAt'>): Promise<FlightMargin> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const margin: FlightMargin = {
      ...marginData,
      id: uuidv4(),
      updatedAt: new Date().toISOString()
    };
    
    mockFlightMargins.push(margin);
    return margin;
  },

  async updateFlightMargin(marginId: string, updates: Partial<FlightMargin>): Promise<FlightMargin> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockFlightMargins.findIndex(margin => margin.id === marginId);
    if (index === -1) throw new Error('Flight margin not found');
    
    mockFlightMargins[index] = {
      ...mockFlightMargins[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return mockFlightMargins[index];
  },

  async deleteFlightMargin(marginId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    mockFlightMargins = mockFlightMargins.filter(margin => margin.id !== marginId);
  }
};


// Package Margin Management
export const packageMarginService = {
  async getPackageMargins(): Promise<PackageMargin[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockPackageMargins];
  },

  async createPackageMargin(marginData: Omit<PackageMargin, 'id' | 'updatedAt'>): Promise<PackageMargin> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const margin: PackageMargin = {
      ...marginData,
      id: uuidv4(),
      updatedAt: new Date().toISOString()
    };
    mockPackageMargins.push(margin);
    return margin;
  },

  async updatePackageMargin(marginId: string, updates: Partial<PackageMargin>): Promise<PackageMargin> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockPackageMargins.findIndex(margin => margin.id === marginId);
    if (index === -1) throw new Error('Package margin not found');
    mockPackageMargins[index] = {
      ...mockPackageMargins[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return mockPackageMargins[index];
  },

  async deletePackageMargin(marginId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    mockPackageMargins = mockPackageMargins.filter(margin => margin.id !== marginId);
  }
};

// Hotel Margin Management (global)
export const hotelMarginService = {
  async getHotelMargins(): Promise<HotelMargin[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockHotelMargins];
  },

  async createHotelMargin(marginData: Omit<HotelMargin, 'id' | 'updatedAt'>): Promise<HotelMargin> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const margin: HotelMargin = {
      ...marginData,
      id: uuidv4(),
      updatedAt: new Date().toISOString()
    };
    mockHotelMargins.push(margin);
    return margin;
  },

  async updateHotelMargin(marginId: string, updates: Partial<HotelMargin>): Promise<HotelMargin> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockHotelMargins.findIndex(margin => margin.id === marginId);
    if (index === -1) throw new Error('Hotel margin not found');
    mockHotelMargins[index] = {
      ...mockHotelMargins[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return mockHotelMargins[index];
  },

  async deleteHotelMargin(marginId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    mockHotelMargins = mockHotelMargins.filter(margin => margin.id !== marginId);
  }
};


// Hotel Management
export const hotelService = {
  async getHotels(): Promise<Hotel[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...hotels];
  },

  async createHotel(hotelData: Omit<Hotel, 'id'>): Promise<Hotel> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const hotel: Hotel = {
      ...hotelData,
      id: `h_${Date.now()}`
    };
    
    hotels.push(hotel);
    return hotel;
  },

  async updateHotel(hotelId: string, updates: Partial<Hotel>): Promise<Hotel> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = hotels.findIndex(hotel => hotel.id === hotelId);
    if (index === -1) throw new Error('Hotel not found');
    
    hotels[index] = { ...hotels[index], ...updates };
    return hotels[index];
  },

  async deleteHotel(hotelId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = hotels.findIndex(hotel => hotel.id === hotelId);
    if (index !== -1) {
      hotels.splice(index, 1);
    }
  },

  async getHotelsByDestination(destinationId: string): Promise<Hotel[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return hotels.filter(hotel => hotel.destinationId === destinationId);
  }
};

// Analytics
export const analyticsService = {
  async getDashboardStats() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      totalDestinations: 19,
      totalPhotos: mockPhotos.length,
      totalHotels: hotels.length,
      totalUsers: mockUsers.length,
      activeUsers: mockUsers.filter(user => user.isActive).length,
      recentUploads: mockPhotos.slice(-5),
      popularDestinations: [
        { name: 'Thailand', views: 1250 },
        { name: 'Greece', views: 980 },
        { name: 'UAE', views: 750 }
      ]
    };
  }
};
