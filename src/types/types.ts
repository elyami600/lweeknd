// Enum for Payment Status
export enum PaymentStatus {
    Pending = "pending",
    Completed = "completed",
    Refunded = "refunded",
  }
  
  // Enum for Barber Availability Status
  export enum SlotStatus {
    Available = "available",
    Booked = "booked",
  }
  
  // User Model
  export interface User {
    id: number;
    name: string;
    email: string;
    role: "guest" | "customer" | "barber";
    avatarURL: string;
  }
  
  // Barbershop Model
  export interface Barbershop {
    id: string;
    name: string;
    location: string;
    barbers: string[]; // List of barber IDs
    services: string[];
    ratings: number[];
    average_rating: number;
    avatarURL: string;
  }
  
  // Barber Model
  export interface Barber {
    id: string;
    name: string;
    barbershop: string; // Reference to Barbershop ID
    services: string[];
    ratings: number[];
    average_rating: number;
    reviews: Review[];
    available_slots: AvailableSlot[];
    pricing: Record<string, number>; // Pricing per service
    payment_preference: string[]; // E.g., ["Cash", "Zelle"]
  }
  
  // Review Model
  export interface Review {
    customer: string;
    rating: number;
    text: string;
  }
  
  // Available Slot Model
  export interface AvailableSlot {
    date_time: string; // UTC DateTime String
    status: SlotStatus;
  }
  
  // Appointment Model
  export interface Appointment {
    id: string;
    customer_id: number;
    barber_id: string;
    service: string;
    price: number;
    duration: string;
    date_time: string;
    status: "confirmed" | "cancelled";
    payment_status: PaymentStatus;
  }
  