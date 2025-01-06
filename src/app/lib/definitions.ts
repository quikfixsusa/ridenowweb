import { HTMLInputTypeAttribute } from 'react';

export interface InputType {
  name: string;
  value: string;
  placeholder: string;
  error: boolean;
  errorMessage: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type: HTMLInputTypeAttribute;
  min?: string;
  max?: string;
}

export interface itemList {
  rute: string;
  name: string;
}

export interface ButtonSidepanelProps extends itemList {
  svg: JSX.Element;
}

// Users types

export interface User {
  id: string;
  jobsRejectedCount: number;
  firstName?: string;
  lastName?: string;
  timeUntilOfferServices: TimeUntilOfferServices;
  userName: string;
  createdAt: CreatedAt;
  addresses: any[];
  servicesOffered: any[];
  reviewer: any;
  image: string;
  stripeDetailsSubmitted: boolean;
  vehicle: Vehicle;
  vehicleRequirements: Requirement[];
  vehicleInReview: boolean;
  requirements: Requirement[];
  requirementsInReview: boolean;
  phoneNumber: string;
  businessName: string;
  notificationToken: string;
  userType: string;
  email: string;
  stripeConnectAccountId: string;
  status: string;
}

export interface TimeUntilOfferServices {
  seconds: number;
  nanoseconds: number;
}

export interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}

export interface Vehicle {
  color: string;
  make: string;
  model: string;
  year: string;
  plate: string;
  vehicle_type: string[];
}

export interface Requirement {
  title: string;
  description: string;
  value?: string;
  link: string;
  verificationSteps: string;
  note: string;
  format: string;
  status: 'reception' | 'inReview' | 'edit' | 'approved';
}
