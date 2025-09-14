export interface Lead {
  id: string;
  name: string;
  contact: string;
  altPhone?: string;
  email: string;
  altEmail?: string;
  status: 'New' | 'Follow-Up' | 'Qualified' | 'Converted';
  qualification: 'High School' | 'Bachelors' | 'Masters' | 'PhD' | 'Other';
  interest: string;
  jobInterest?: string;
  source: 'Email Campaign' | 'Website' | 'Cold Call' | 'Social Media';
  assignedTo: string;
  city?: string;
  state?: string;
  heardFrom?: string;
  passoutYear?: string;
  updatedAt: string;
}

export interface CreateLeadRequest {
  name: string;
  contact: string;
  altPhone?: string;
  email: string;
  altEmail?: string;
  status: 'New' | 'Follow-Up' | 'Qualified' | 'Converted';
  qualification: 'High School' | 'Bachelors' | 'Masters' | 'PhD' | 'Other';
  interest: string;
  jobInterest?: string;
  source: 'Email Campaign' | 'Website' | 'Cold Call' | 'Social Media';
  assignedTo: string;
  city?: string;
  state?: string;
  heardFrom?: string;
  passoutYear?: string;
}

export interface LeadStatus {
  label: string;
  color: string;
  bgColor: string;
}

export const LEAD_STATUS_CONFIG: Record<Lead['status'], LeadStatus> = {
  'New': {
    label: 'New',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100'
  },
  'Follow-Up': {
    label: 'Follow-Up',
    color: 'text-orange-700',
    bgColor: 'bg-orange-100'
  },
  'Qualified': {
    label: 'Qualified',
    color: 'text-green-700',
    bgColor: 'bg-green-100'
  },
  'Converted': {
    label: 'Converted',
    color: 'text-purple-700',
    bgColor: 'bg-purple-100'
  }
};
