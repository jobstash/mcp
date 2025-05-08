import { URLSearchParams } from 'url';
import { SearchJobsInputArgs } from '../schemas';

export const buildJobSearchQuery = (args: SearchJobsInputArgs): URLSearchParams => {
    const searchParams = new URLSearchParams();

    if (args.tags && args.tags.length > 0) {
        searchParams.set('tags', args.tags.map(tag => tag.toLowerCase()).join(','));
    }
    if (args.locations && args.locations.length > 0) {
        searchParams.set('locations', args.locations.map(loc => loc.toLowerCase()).join(','));
    }
    if (args.seniority && args.seniority.length > 0) {
        searchParams.set('seniority', args.seniority.map(sen => sen.toLowerCase()).join(','));
    }
    if (args.commitments && args.commitments.length > 0) {
        searchParams.set('commitments', args.commitments.map(com => com.toLowerCase()).join(','));
    }
    if (args.investors && args.investors.length > 0) {
        searchParams.set('investors', args.investors.map(inv => inv.toLowerCase()).join(','));
    }
    if (args.classifications && args.classifications.length > 0) {
        searchParams.set('classifications', args.classifications.map(cls => cls.toLowerCase()).join(','));
    }

    if (args.salaryMin !== undefined) {
        searchParams.set('minSalaryRange', String(args.salaryMin));
    }
    if (args.salaryMax !== undefined) {
        searchParams.set('maxSalaryRange', String(args.salaryMax));
    }
    if (args.equity !== undefined) {
        searchParams.set('token', String(args.equity)); // 'token' is the API param for equity
    }

    return searchParams;
}; 