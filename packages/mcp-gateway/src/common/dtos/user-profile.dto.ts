// DTO defining the structure for user profile information extracted from a CV

export interface LinkedAccounts {
    discord?: string | null;
    telegram?: string | null;
    github?: string | null;
    twitter?: string | null;
    google?: string | null;
    apple?: string | null;
    farcaster?: string | null;
    email?: string | null; // Primary contact email if found
    wallets?: string[];
}

export interface Location {
    country?: string | null;
    city?: string | null;
}

export interface UserProfile {
    name?: string | null;
    location?: Location | null; // Changed from object to interface
    alternateEmails?: string[];
    linkedAccounts?: LinkedAccounts | null; // Changed from object to interface
} 