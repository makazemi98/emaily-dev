const express = require('express');
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
const cookieSession   = require('cookie-session');
require('./model/User');
require('./services/passport');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(keys.mongoURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize())
app.use(passport.session())
app.use(authRoutes);

app.listen(PORT, () => console.log(`app Is Running On Port : (${PORT})`));



/*

https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?
// response_type=code&
redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fmak&scope=profile%20email&
client_id=502034330307-fb2niagb95adoqoqc9nqitr2u8djj6dl.apps.googleusercontent.com&flowName=GeneralOAuthFlow

*/