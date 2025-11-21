export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  modality: 'remote' | 'hybrid' | 'onsite';
  workload: string;
  flexScore: number;
  salary?: string;
  description: string;
  requirements: string[];
  benefits: string[];
  accessibility: string[];
  schedule: string[];
  postedDate: string;
  category: string;
}
export interface FlexScoreDetails {
  remoteWork: boolean;
  flexibleHours: boolean;
  reducedWorkload: boolean;
  accessibilityFeatures: string[];
  equipmentProvided: boolean;
  negotiableSchedule: boolean;
}