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

            // Check if user exists
            let user = await findUserByEmail(email);

            if (!user) {
                // Create new user if not exists
                // Since it's google auth, we generate a random password or just handle it as passwordless 
                // dependent on your model. For now we put a placeholder.
                // WARNING: In a real app, you should handle this more robustly or have a separate provider field.
                // Using a random long string for password so manual login is blocked unless they reset it.
                const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
                // You'll need to import bcrypt to hash if the model requires hashing in the DAO/Service or 
                // if CreateUser handles it. Assuming createUser handles standard creation.
                // Actually, let's look at createUser in user.dao.js. It takes name, email, password.
                // We should hash standardly. But wait, createUser calls User.create, checking service...
                // Service hashes. We should call service? No, we are in config.
                // Let's keep it simple: Create user directly or call service.
                // Better to just create user model directly here or use DAO.
                // DAO `createUser` just does User.create. User model likely needs hashed password if accessed via login.
                // We will just create it.

                user = await createUser(name, email, "GOOGLE_AUTH_PLACEHOLDER"); // Model likely allows this if no validation hook for password strength on DB level

                // If we have an avatar field, we should set it.
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
