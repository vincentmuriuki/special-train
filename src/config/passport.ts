import config from '.';


const passport = require('passport');


const strategyCallback = (accessToken: string, refreshToken: string, profile: any, done: any) => {
  process.nextTick(() => done(null, profile));
};


export default passport;
