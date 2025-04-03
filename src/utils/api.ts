import { 
  _getUsers,
  _getUser,
  _getServiceCenters,
  _getStylist,
  _getBooking
} from "./mockData";

import { User } from "../types/User";
import { ServiceCenter } from "../types/ServiceCenter";
import { Stylist } from "../types/Stylist";
import { Booking } from "../types/Booking";



// 🔧 Updated Return Type
export async function getInitialData(): Promise<{
  users: User[];
  serviceCenters: ServiceCenter[];
  stylists: Stylist[];
  bookings: Booking[];
}> {
  const [users, serviceCenters, stylists, bookings] = await Promise.all([
    _getUsers(),
    _getServiceCenters(),
    _getStylist(),
    _getBooking()
  ]);

  return {
    users,
    serviceCenters,
    stylists,
    bookings
  };
}

// Get one user
export function getUser(userId: string): Promise<User> {
  return _getUser(userId);
}

// Get all users
export function getAllUsers(): Promise<User[]> {
  return _getUsers();
}


export function getAllServiceCenters(): Promise<ServiceCenter[]> {
  return _getServiceCenters();
}

export function getAllStylist(): Promise<Stylist[]> {
  return _getStylist()
}

export function getAllBooking(): Promise<Booking[]> {
  return _getBooking()
}