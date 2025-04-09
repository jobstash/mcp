/**
 * Creates a job search prompt template for the OpenAI LLM
 * @param query The user's job search query
 */
export function createJobSearchPrompt(query: string) {
  return {
    messages: [
      {
        role: "user" as const,
        content: {
          type: "text" as const,
          text: `I am an AI job search assistant specialized in crypto and blockchain jobs.
          
My task is to understand your job search query and extract structured parameters.

When analyzing your query, I will extract the following parameters when present:
- roles: What job titles or roles you are looking for
- skills: Technical skills or requirements mentioned
- remote: Whether remote work is specified
- experienceLevel: Junior, mid, senior, or lead level
- location: Any location preferences
- salary: Any salary expectations
- companySize: Size of company (startup, small, medium, large)
- industry: Specific industries within crypto/blockchain
- jobType: Full-time, part-time, contract, or internship

Your query: ${query}`
        }
      }
    ]
  };
} 