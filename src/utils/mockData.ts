// mockData.ts

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
    ratings: number[];
    average_rating: number;
    available_slots: {
      date_time: string;
      status: string;
    }[];
    pricing: Record<string, number>;
    payment_preference: string[];
  }
  
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
  
  export const users: User[] = [
    {
      name: "John Doe",
      password: "password123",
      email: "johndoe@example.com",
      role: "guest",
      avatarURL: "https://via.placeholder.com/250"
    }
  ];
  
  export const serviceCenters: ServiceCenter[] = [
    {
      id: "classiccuts",
      name: "Classic Cuts",
      type: "barbershop",
      location: "123 Main St, Springfield",
      stylists: ["johnbarber", "annestylist"],
      services: ["Haircut", "Beard Trim"],
      ratings: [4, 5, 3, 4, 5],
      average_rating: 4.2,
      avatarURL:"https://i.pravatar.cc/250?u=annestylist@example.com",


    }
  ];
  
  export const stylists: Stylist[] = [
    {
      id: "johnbarber",
      name: "John Barber",
      profession: "barber",
      shop_id: "classiccuts",
      services: ["Haircut", "Beard Trim"],
      ratings: [5, 4, 5],
      average_rating: 4.7,
      available_slots: [
        {
          date_time: "2025-03-18T08:00:00Z",
          status: "available"
        }
      ],
      pricing: {
        Haircut: 25,
        "Beard Trim": 15
      },
      payment_preference: ["Cash", "Zelle", "CashApp"]
    }
  ];
  
  export const bookings: Booking[] = [
    {
      id: "apt1",
      user_id: "mikejones",
      service_center_id: "classiccuts",
      stylist_id: "johnbarber",
      service: "Haircut",
      price: 25,
      scheduled_datetime: "2025-04-01T10:00:00",
      status: "confirmed"
    }
  ];
   
  export function _getUsers(): Promise<User[]> {
    return Promise.resolve(users);
  }
  
  // Get a single user by email (ID)
  export function _getUser(userId: string): Promise<User> {
    return new Promise((resolve, reject) => {
      const user = users.find((u) => u.email === userId);
      if (!user) {
        return reject("User not found.");
      }
      resolve(user);
    });
  }

  export function _getServiceCenters(): Promise<ServiceCenter[]> {
    return Promise.resolve(serviceCenters);
  }

  export function _getStylist(): Promise<Stylist[]> {
    return Promise.resolve(stylists);
  }

  export function _getBooking(): Promise<Booking[]> {
    return Promise.resolve(bookings);
  }