import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import * as bcrypt from 'bcrypt';
import User from './Models/User';

interface IVerifyOptions {
  message: string
}

class PassportSetup {
  constructor() {
    this.setupLocalStrategy();
    this.setupJWTStrategy();
  }

  setupLocalStrategy(): any {
    passport.use(new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password'
      }, async (username: string, password: string, done: (error: any, user?: any, options?: (IVerifyOptions)) => void): Promise<any> => {
        try {
          const user = await User.findOne({ username }).exec();
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return done(null, user);
          } else {
             return done({ code: 'LOGIN_FAIL', message: 'Incorrect Email / Password', status: 401 });
          }

        } catch (error) {
          done({ code: 'LOGIN_FAIL', message: 'Incorrect Email / Password', status: 401 });
        }
      }
    ));
  }

  setupJWTStrategy(): any {
    passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'GINGERBREAD'
     }, (jwtPayload: any, done) => {
      // Is this even used?
      // const expired = new Date(jwtPayload.exp * 1000).getTime();

      // if (expired > new Date().getTime()) {
      //   return done({ message: 'Token expired', status: 401 });
      // }
      return done(null, jwtPayload);
    }));
  }
}

export default PassportSetup;