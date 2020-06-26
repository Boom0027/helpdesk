/**
 * Interface for tweet service
 * Author: Tirthamouli Baidya
 */

// Step 1: Defining common response

// Step 2: Defining interface
export interface ITweetService {
  getTweets: (token:string, tokenSecret: string, twitterDisplayName: string) => Promise<any>
}
