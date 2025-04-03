export interface ServiceCenter {
    id: string;
    name: string;
    type: string;
    location: string;
    stylists: string[];
    services: string[];
    ratings: number[];
    average_rating: number;
    avatarURL: string;
  }