import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import { user } from '../db/schema/userSchema';
import { db } from "../index";
import { eq } from 'drizzle-orm';
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET ?? "secret",
};
passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    // UserModel.findOne({ id: jwt_payload.id }, function (err, user) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //         // or you could create a new account
    //     }
    // });
    try {
        const result = await db.select().from(user).where(eq(user.id, jwt_payload.id));
        if (result) {
            return done(null, result);
        }
        else // if no user is found
            return done(null, false);
    }
    catch (error) {
        return done(error, false);
    }
}));
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/callback"
}, async function (accessToken, refreshToken, profile, cb) {
    try {
        const userData = {
            name: profile._json.given_name,
            email: profile._json.email,
            authType: 'oauth'
        };
        const result = await db.select().from(user).where(eq(user.email, profile.email));
        if (result[0]) {
            console.log("result");
            return cb(null, result);
        }
        else {
            return cb(null, false);
        }
    }
    catch (error) {
        return cb(error, null);
    }
}));
//Persists user data inside session
passport.serializeUser(function (user, done) {
    done(null, user);
});
//Fetches session details using session id
passport.deserializeUser(async function (email, done) {
    db.select().from(user).where(eq(user.email, email)).then((result) => {
        done(null, result);
    }).catch((err) => {
        done(err, null);
    });
});
//# sourceMappingURL=passport.js.map