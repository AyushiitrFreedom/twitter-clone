import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const GoogleStrategy = require('passport-google-oauth20').Strategy;
import passport from 'passport';
import { user, User, InsertUser } from '../db/schema/userSchema';
import { db } from "../index";
import { eq } from 'drizzle-orm';






passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/callback"
},
    async function (accessToken: string, refreshToken: string, profile: any, cb: any) {

        try {

            const userData = {

                name: profile._json.given_name,

                email: profile._json.email,
                authType: 'oauth'
            }
            const result: User[] = await db.select().from(user).where(eq(user.email, profile.email));
            if (result[0]) {
                console.log("result");
                return cb(null, result);
            } else {
                return cb(null, false)
            }
        } catch (error) {
            return cb(error, null)
        }


    })

);

//Persists user data inside session
passport.serializeUser(function (user, done) {
    done(null, user);
});

//Fetches session details using session id
passport.deserializeUser(async function (email: string, done) {
    db.select().from(user).where(eq(user.email, email)).then((result) => {
        done(null, result);
    }).catch((err) => {
        done(err, null);
    })
});
