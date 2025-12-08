import { Timestamp } from 'firebase/firestore';

export type DriverRequirementStatus = 'accepted' | 'completed' | 'edit' | 'pending';

export type DriverRequirementType =
  | 'driver_licence'
  | 'ssn'
  | 'criminal_record'
  | 'vehicle_registration'
  | 'rcv_insurance'
  | 'id_card'
  | 'vehicle_insurance'
  | 'rif'
  | 'medical_certificate'
  | 'vehicle_title'
  | 'insurance'
  | 'insurance_proof'
  | 'circulation_permit';

export interface DriverRequirementReview {
  id: string;
  driver_name: string; // `${data.firstName} ${data.lastName}`
  driver_id: string;
  requirement_type: DriverRequirementType;
  title_requirement: string;
  file_url: string | null;
  status: DriverRequirementStatus;
  created_at: Timestamp;
  taken_at: Timestamp | null;
  reviewed_at: Timestamp | null;
  reviewer_id: string | null;
  metadata: Record<string, any>;
}
