import { GeoPoint, Timestamp } from 'firebase/firestore';

import { DriverRequirementType } from './reviewsTypes';

export type MultiLanguageProp = {
  es: string;
  en: string;
};

export type TypeRide =
  | 'Comfort'
  | 'Delivery'
  | 'Packages'
  | 'PickupL'
  | 'PickupM'
  | 'PickupS'
  | 'RideMoto'
  | 'RidePet'
  | 'RideXL'
  | 'Standard'
  | 'VanL'
  | 'VanM'
  | 'VanS';

export interface IBaseUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  username: string;
  apple_id: string | null;
  role: 'rider' | 'driver' | 'reviewer';
  status: 'active' | 'inactive' | 'banned' | 'deleted';
  current_ride_id: string | null;
  image: string | null;
  trusted_contacts: TrustedContact[];
  notification_token: string | null;
  change_name_available: boolean;
  time_last_username_update: Timestamp;
  created_at: Timestamp;
  email_verified: boolean;
}

export type DBTimeStamp = {
  seconds: number;
  nanoseconds: number;
};

export interface IRiderUser extends IBaseUser {
  role: 'rider';
  stripe_customer_id: string | null;
  addresses: RiderAddress[];
}

export type RiderAddress = {
  address_text: string; // Ej: "123 Main St, Springfield, IL"
  latitude: number; // Ej: 39.7817
  longitude: number; // Ej: -89.6501
  city: string; // Ej: "Springfield"
  state: string; // Ej: "IL"
  country: string; // Ej: "USA"
  reference_name: string; // Ej: "Home", "Work"
  is_favorite: boolean; // true si es una dirección favorita
};

export type TrustedContact = {
  country_code: string; // Ej: "US"
  phone_number: string; // Ej: "+5551234567"
  name: string; // Ej: "John Doe"
  formatted_phone_number: string; // Ej: "(555) 123-4567"
};

export interface IDriverUser extends IBaseUser {
  country: string | null;
  role: 'driver';
  availability: 'available' | 'busy' | 'in_ride';
  angle: number;
  already_free_ride: boolean;
  complete_first_ride: boolean;
  complete_driver_training: boolean;
  current_location: GeoPoint | null;
  current_session_id: string | null;
  geohash: string | null;
  insurance: IDriverInsurance | null;
  insurance_approved: boolean;
  is_woman: boolean;
  last_reset_date: Timestamp;
  last_update_driving_time: Timestamp;
  last_verification_time: Timestamp;
  navigation_tool: 'google_maps' | 'waze' | null;
  on: boolean;
  options_enabled: OptionsEnabled | null;
  rating: number;
  reviews: IDriverReview[];
  requirements: DriverRequirement[];
  requirements_approved: boolean;
  rides_rejected_count: number;
  stripe_account_id: string | null;
  stripe_onboarded: boolean;
  suspended: boolean;
  suspended_reason: string | null;
  time_to_offer_rides: Timestamp;
  total_rating: number;
  total_rides: number;
  total_driving_time: number; // in seconds
  vehicle: DriverVehicle | null;
  vehicle_approved: boolean;
  vehicle_requirements: DriverRequirement[];
  verify_identity_required: boolean;
  weckly_identity_checks: number;
}

export type VehicleType =
  | 'Hatchback'
  | 'Sedan'
  | 'Standard'
  | 'Coupe'
  | 'SUV'
  | 'Van/Minivan'
  | 'Comfort'
  | 'Wagon'
  | 'Pickup/small'
  | 'Pickup/medium'
  | 'Pickup/large'
  | 'Van/Minivan/small'
  | 'Van/Minivan/medium'
  | 'Van/Minivan/large'
  | 'Bike'
  | 'Motorbike'
  | 'Scooter';

export type DriverVehicle = {
  capacity: number;
  color: string;
  license_plate: string;
  make: string;
  model: string;
  year: number;
  vehicle_type: VehicleType;
};

export type RequirementStatus = 'reception' | 'pending' | 'in_review' | 'approved' | 'edit' | 'rejected';

export type DriverRequirement = {
  id: DriverRequirementType;
  description: MultiLanguageProp;
  format: string;
  image_url?: string;
  link: string;
  title: MultiLanguageProp;
  value?: string;
  note: string;
  status: RequirementStatus;
  verification_steps: string;
};

export type OptionsEnabled = Record<TypeRide, boolean>;

export type InsuranceStatus = 'submitted' | 'in_review' | 'approved' | 'edit' | 'expired' | 'rejected';

export interface IDriverInsurance {
  document_url: string;
  due_date: Timestamp;
  effective_date: Timestamp;
  expiry_date: Timestamp;
  includes_rideshare: boolean;
  insurer_name: string;
  last_verified: Timestamp | null;
  policy_number: string;
  notes: string;
  submitted_at: Timestamp;
  status: InsuranceStatus;
  reviewer_id: string | null;
  monthly_checks: MonthlyCheck[];
}

export type MonthlyCheck = {
  document_url: string;
  due_date: Timestamp;
  submitted_at: Timestamp;
  status: 'submitted' | 'in_review' | 'approved' | 'rejected' | 'edit';
  reviewer_id: string | null;
  type: string;
  note: string;
};

export type DriverLocation = {
  latitude: number;
  longitude: number;
  updated_at: Timestamp;
};

export interface IDriverReview {
  id: string; // ID único del review
  client_id: string; // quién dejó el review
  service_id: string; // servicio relacionado
  rating: number; // número 1–5
  comment?: string; // texto opcional
  created_at: string; // ISO date
}

export type UserType = IRiderUser | IDriverUser;
