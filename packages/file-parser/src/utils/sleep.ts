/**
 * Utility function to pause execution for a specified duration.
 * @param ms Time to sleep in milliseconds.
 * @returns A promise that resolves after the specified duration.
 */
export const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms)); 