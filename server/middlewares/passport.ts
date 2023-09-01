import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const GoogleStrategy = require('passport-google-oauth20').Strategy;
import passport from 'passport';
import { user, User, InsertUser } from '../db/schema/Schema';
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
                id: profile._json.id,
                authType: 'oauth'
            }

            console.log(profile._json.email + "mummy nu pasand");
            console.log(typeof userData.email + "mummy nu pasand");
            const result: User[] = await db.select().from(user).where(eq(user.email, userData.email));
            console.log(result[0] + "yo yo honey singh");
            if (result) {
                return cb(null, result);
            } else {
                console.log("NO result");
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
        console.log(result + "deserialise")
        done(null, result);
    }).catch((err) => {
        done(err, null);
    })
});
