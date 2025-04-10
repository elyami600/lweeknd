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