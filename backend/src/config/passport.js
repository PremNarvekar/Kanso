import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { findUserByEmail, createUser } from '../dao/user.dao.js';
import { signToken } from '../utils/helper.js';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || "MISSING_CLIENT_ID",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "MISSING_CLIENT_SECRET",
    callbackURL: "https://url-shortner-x857.onrender.com/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            const email = profile.emails[0].value;
            const name = profile.displayName;
            const avatar = profile.photos[0]?.value;


            let user = await findUserByEmail(email);

            if (!user) {

                const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);


                user = await createUser(name, email, "GOOGLE_AUTH_PLACEHOLDER");


                if (avatar) {
                    user.avatar = avatar;
                    await user.save();
                }
            }

            const token = signToken({ id: user._id });
            return cb(null, { user, token });

        } catch (err) {
            return cb(err, null);
        }
    }
));

export default passport;
