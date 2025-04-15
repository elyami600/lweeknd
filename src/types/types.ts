export interface User {
  name: string;
  password: string;
  email: string;
  role: string;
  avatarURL: string;
}

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


export interface Stylist {
  id: string;
  name: string;
  profession: string;
  shop_id: string | null;
  services: string[];
  avatarURL: string;
  ratings: number[];
  average_rating: number;
  available_slots: {
    date_time: string;
    status: string;
  }[];
  pricing: Record<string, number>;
  payment_preference: string[];
}


type status = "pending" | "confirmed" | "cancelled";


export interface Booking {
  id: string;
  user_id: string;
  service_center_id: string;
  stylist_id: string;
  service: string;
  price: number;
  scheduled_datetime: string;
  status: string;
 
}
