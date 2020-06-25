"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TwitterService {
    constructor(twitterAccountRepository) {
        this.twitterAccountRepository = twitterAccountRepository;
    }
    async addTwitterAccount(token, tokenSecret, { id, username, displayName, photos, }, done) {
        const userdetails = {
            token,
            tokenSecret,
            profile: {
                id,
                username,
                displayName,
                photoURL: photos && photos.length >= 1 ? photos[0].value : '',
            },
        };
        const oldUser = await this.twitterAccountRepository.getUserByID(id);
        if (oldUser) {
            const user = await this.twitterAccountRepository.updateUser(userdetails);
            return done(null, { ...user, oldUser: true });
        }
        const user = await this.twitterAccountRepository.addUser(userdetails);
        return done(null, { ...user, oldUser: false });
    }
}
exports.default = TwitterService;
