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
  representative?: Representative;
  phoneNumber: string;
  requirementsInReview: boolean;
  businessName: string;
  representativeInReview: boolean;
  notificationToken: string;
  userType: string;
  email: string;
  requirements: Requirement[];
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

export interface Representative {
  driverLicense: string;
  jobTitle: string;
  status: 'reception' | 'inReview' | 'edit' | 'approved';
  lastName: string;
  phoneNumber: string;
  email: string;
  firstName: string;
  note: string;
}

export interface Requirement {
  title: string;
  description: string;
  link: string;
  verificationSteps: string;
  note: string;
  format: string;
  status: 'reception' | 'inReview' | 'edit' | 'approved';
}
