// DTO describing structured job-related data extracted from a CV by NLU
// Mirrors cv_job_data_schema from @jobstash/mcp-server

export interface CvJobData {
    skills?: string[];
    jobTitles?: string[];
    locations?: string[];
    seniorityKeywords?: string[];
    yearsExperience?: number;
    companyNames?: string[];
    educationLevel?: string;
    fullCvText?: string; // Optional: Include if NLU needs it later
} 