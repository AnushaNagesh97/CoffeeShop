const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(async function verify(username, password, cb) {
    try {
        const query = { username: username };
        const row = await mongoClient.collection.findOne(query);
        if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
        const rowSaltBuffer = Buffer.from(row.salt.buffer);
        crypto.pbkdf2(password, rowSaltBuffer, 310000, 32, 'sha256', function(err, hashedPassword) {
            if (err) { return cb(err); }
            const passwordBuffer = Buffer.from(row.password.buffer);
            if (!crypto.timingSafeEqual(passwordBuffer, hashedPassword)) {
                console.log("User not authenticated");
              return cb(null, false, { message: 'Incorrect username or password.' });
            }
            console.log("User authenticated");
            return cb(null, row);
          });

    } catch (error) {
        return cb(error);
    }
  }));

  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });
