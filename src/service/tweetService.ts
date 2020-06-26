/**
 * Tweet service
 * Author: Tirthamouli Baidya
 */
import { ITweetService } from '../types/service/tweetServiceInterface';
import { get } from '../helpers/twitterHelper';

class TweetService implements ITweetService {
  async getTweets(token:string, tokenSecret: string, twitterDisplayName: string) {
    const data = await get(token, tokenSecret, twitterDisplayName);
    console.log(data);
    return true;
  }
}
export default TweetService;
