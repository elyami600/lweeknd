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
  