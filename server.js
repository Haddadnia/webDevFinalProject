var mongoose = require('mongoose');
// default to a 'localhost' configuration:
var connectionString = 'mongodb://localhost/test';
// if OPENSHIFT env variables are present, use the available connection info:
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;
}
var db = mongoose.connect(connectionString);
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());


app.use(cookieParser());
app.use(session({ secret: 'this is the secret' }));
app.use(passport.initialize());
app.use(passport.session());

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    role: String,
    favoriteChairs: [],
    favoriteUsers: [],
    chairs: [],
    chairToView: [],
    userToView: []
});

var ChairSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    usersWhoFavorited: [],
    comments: []
});

var CommentSchema = new mongoose.Schema({
    text: String,
    user: []
});

var UserModel = mongoose.model("UserModel", UserSchema);
var ChairModel = mongoose.model("ChairModel", ChairSchema);
var CommentModel = mongoose.model("CommentModel", CommentSchema);

//login
passport.use(new LocalStrategy(
function (username, password, done) {
    UserModel.findOne({ username: username, password: password }, function (err, user) {
        if(user)
        {
            return done(null, user);
        }
                return done(null, false, { message: 'Unable to login' });
    });    
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    UserModel.findById(user._id, function (err, user) {
        done(err, user);
    });
});

app.post('/login', passport.authenticate('local'), function (req, res) {
    res.json(req.user);
});

app.post('/register', function (req, res) {
    UserModel.findOne({ username: req.body.username }, function (err, user) {
        if (user) {
            res.json(null);
            return;
        } else {
            var newUser = new UserModel(req.body);
            newUser.save(function (err, user) {
                req.login(user, function (err) {
                    if (err) {
                        return next(err);
                    }
                    res.json(user);
                });
            });
        }
    });
});

app.get('/loggedin', function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

app.post('/logout', function (req, res) {
    req.logOut();
    res.send(200);
});

app.get('/syncRequest', function (req, res) {
    res.send(200);
});

app.get('/comment/:id', function (req, res) {
    CommentModel.findById(req.params.id, function (err, comment) {
        res.json(comment);
    });
});

app.post('/comment', function (req, res) {
    var newComment = new CommentModel(req.body);
    newComment.save(function (err, comment) {
        res.json(comment);
    });
})

app.delete('/comment/:id', function (req, res) {
    var id = req.params.id;
    CommentModel.remove({ _id: id }, function (err, count) {
        res.json(count);
    });
});
///////////////////Chair stuff

app.get('/allChairs', function (req, res) {
    ChairModel.find(function (err, chairs) {
        res.json(chairs);
    });
});

app.post('/chair', function (req, res) {
    var newChair = new ChairModel(req.body);
    newChair.save(function (err, chair) {
        res.json(chair);
    });
});

app.get('/chair/:id', function (req, res) {
    ChairModel.findById(req.params.id, function (err, chair) {
        res.json(chair);
    });
});

app.put("/updateChair/:id", function (req, res) {
    ChairModel.findById(req.params.id, function (err, chair) {
        chair.update(req.body, function (err, count) {
            ChairModel.findById(req.params.id, function (err, chair) {
                res.json(chair);
            });
        });
    });
});

app.delete('/chair/:id', function (req, res) {
    var id = req.params.id;
    ChairModel.remove({ _id: id }, function (err, count) {
        res.json(count);
    });
});
/////////////////////User stuff

app.put("/updateUser/:id", function (req, res) {
    /*
    UserModel.findById(req.params.id, function (err, user) {
        user.update(req.body, function (err, count) {
            UserModel.findById(req.params.id, function (err, user) {
                res.json(user);
            });
        });
    });
    */
    var id = req.params.id;
    UserModel.remove({ _id: id }, function (err, count) {
        var newUser = new UserModel(req.body);
        newUser._id = id;
        newUser.save(function (err, user) {
            res.json(user);
        });
    });
});

app.get('/user/:id', function (req, res) {
    UserModel.findById(req.params.id, function (err, user) {
        res.json(user);
    });

});

/////database ^^
/*
app.delete('/user/:index', function (req, res) {
    var index = req.params['index'];
    users.splice(index, 1);
    res.json(users);
});
*/

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ip);

/*
MongoDB 2.4 database added.  Please make note of these credentials:

   Root User:     admin
   Root Password: PX5V9w__C9lq
   Database Name: bentsonhaddadniafinalproject

Connection URL: mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/
*/