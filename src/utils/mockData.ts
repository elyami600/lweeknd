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
    avatarURL: "https://i.pravatar.cc/250?u=john"
  },
  {
    name: "Sarah Lee",
    password: "sarah123",
    email: "sarah@example.com",
    role: "guest",
    avatarURL: "https://i.pravatar.cc/250?u=sarah"
  },
  {
    name: "Carlos Rivera",
    password: "carlospass",
    email: "carlos@example.com",
    role: "stylist",
    avatarURL: "https://i.pravatar.cc/250?u=carlos"
  },
  {
    name: "Emily Taylor",
    password: "emily456",
    email: "emily@example.com",
    role: "guest",
    avatarURL: "https://i.pravatar.cc/250?u=emily"
  },
  {
    name: "Liam Brown",
    password: "liam789",
    email: "liam@example.com",
    role: "guest",
    avatarURL: "https://i.pravatar.cc/250?u=liam"
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
    avatarURL: "https://i.pravatar.cc/250?u=classiccuts"
  },
  {
    id: "beautyglow",
    name: "Beauty Glow",
    type: "salon",
    location: "456 Ocean Dr, Miami",
    stylists: ["carlosglow"],
    services: ["Hair Coloring", "Facial", "Makeup"],
    ratings: [5, 5, 4],
    average_rating: 4.8,
    avatarURL: "https://i.pravatar.cc/250?u=beautyglow"
  },
  {
    id: "urbanfade",
    name: "Urban Fade",
    type: "barbershop",
    location: "789 Downtown Ave, New York",
    stylists: ["michaelblend"],
    services: ["Haircut", "Beard Styling"],
    ratings: [5, 4, 5],
    average_rating: 4.6,
    avatarURL: "https://i.pravatar.cc/250?u=urbanfade"
  },
  {
    id: "glamroom",
    name: "The Glam Room",
    type: "salon",
    location: "321 Sunset Blvd, LA",
    stylists: ["ashleystyle"],
    services: ["Nail Art", "Hair Styling"],
    ratings: [5, 5, 5],
    average_rating: 5.0,
    avatarURL: "https://i.pravatar.cc/250?u=glamroom"
  }
];

export const stylists: Stylist[] = [
  {
    id: "johnbarber",
    name: "John Barber",
    profession: "Barber",
    shop_id: "classiccuts",
    services: ["Haircut", "Beard Trim"],
    avatarURL: "https://i.pravatar.cc/250?u=beautyglow",
    ratings: [5, 4, 5],
    average_rating: 4.7,
    available_slots: [
      { date_time: "2025-04-05T10:00:00Z", status: "available" }
    ],
    pricing: { Haircut: 30, "Beard Trim": 15 },
    payment_preference: ["Cash", "Zelle", "CashApp"]
  },
  {
    id: "annestylist",
    name: "Anne Stylist",
    profession: "Hair Stylist",
    shop_id: "classiccuts",
    services: ["Haircut", "Hair Styling"],
    avatarURL: "https://i.pravatar.cc/250?u=ashleystyle",
    ratings: [4, 5, 5],
    average_rating: 4.7,
    available_slots: [
      { date_time: "2025-04-05T09:00:00Z", status: "available" }
    ],
    pricing: { Haircut: 35, "Hair Styling": 45 },
    payment_preference: ["Credit Card"]
  },
  {
    id: "carlosglow",
    name: "Carlos Glow",
    profession: "Beauty Specialist",
    shop_id: "beautyglow",
    services: ["Facial", "Makeup"],
    avatarURL: "https://i.pravatar.cc/250?u=michaelblend",
    average_rating: 4.8,
    ratings: [5, 4, 5],
    available_slots: [
      { date_time: "2025-04-06T14:00:00Z", status: "available" }
    ],
    pricing: { Facial: 60, Makeup: 80 },
    payment_preference: ["Cash", "Zelle", "PayPal"]
  },
  {
    id: "michaelblend",
    name: "Michael Blend",
    profession: "Barber",
    shop_id: "urbanfade",
    services: ["Haircut", "Beard Styling"],
    avatarURL: "https://i.pravatar.cc/250?u=carlosglow",
    ratings: [5, 5, 5],
    average_rating: 5.0,
    available_slots: [
      { date_time: "2025-04-07T11:00:00Z", status: "available" }
    ],
    pricing: { Haircut: 40, "Beard Styling": 20 },
    payment_preference: ["Cash", "Credit Card"]
  },
  {
    id: "ashleystyle",
    name: "Ashley Style",
    profession: "Stylist",
    shop_id: "glamroom",
    services: ["Hair Styling", "Nail Art"],
    avatarURL: "https://i.pravatar.cc/250?u=annestylist",
    ratings: [5, 5, 4],
    average_rating: 4.9,
    available_slots: [
      { date_time: "2025-04-08T13:00:00Z", status: "available" }
    ],
    pricing: { "Hair Styling": 50, "Nail Art": 40 },
    payment_preference: ["Cash", "Venmo"]
  }
];

export const bookings: Booking[] = [
  {
    id: "bk1",
    user_id: "sarah@example.com",
    service_center_id: "classiccuts",
    stylist_id: "johnbarber",
    service: "Haircut",
    price: 30,
    scheduled_datetime: "2025-04-05T10:00:00Z",
    status: "confirmed"
  },
  {
    id: "bk2",
    user_id: "johndoe@example.com",
    service_center_id: "beautyglow",
    stylist_id: "carlosglow",
    service: "Facial",
    price: 60,
    scheduled_datetime: "2025-04-06T14:00:00Z",
    status: "pending"
  },
  {
    id: "bk3",
    user_id: "emily@example.com",
    service_center_id: "urbanfade",
    stylist_id: "michaelblend",
    service: "Haircut",
    price: 40,
    scheduled_datetime: "2025-04-07T11:00:00Z",
    status: "confirmed"
  },
  {
    id: "bk4",
    user_id: "liam@example.com",
    service_center_id: "glamroom",
    stylist_id: "ashleystyle",
    service: "Nail Art",
    price: 40,
    scheduled_datetime: "2025-04-08T13:00:00Z",
    status: "confirmed"
  }
];

function generateUID() {
  return `bk_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`;
}



 
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


export function _saveBooking(newBooking: Omit<Booking, "id">): Promise<Booking> {
  return new Promise((resolve, reject) => {
    if (!newBooking.user_id || !newBooking.service || !newBooking.stylist_id) {
      return reject("Missing booking information.");
    }

    const booking: Booking = {
      id: generateUID(),
      ...newBooking,
      scheduled_datetime: new Date(newBooking.scheduled_datetime).toISOString(),
    };

    bookings.push(booking); 
    resolve(booking);
  });
}