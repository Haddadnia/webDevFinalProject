var mongoose = require('mongoose');
var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/test';
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
    favoriteChairs: [String],
    favoriteUsers: [String]
});

var ChairSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    usersWhoFavorited: [String],
    comments: [String]
});

var CommentSchema = new mongoose.Schema({
    text: String,
    user: String,
    chair: String,});

var UserModel = mongoose.model("UserModel", UserSchema);
var ChairModel = mongoose.model("ChairModel", UserSchema);
var CommentModel = mongoose.model("CommentModel", UserSchema);

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
    done(null, user);
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



///////////////////////////////

var chair1 = { picture: "pic", name: "throne", description: "Sit here if you da king" };
var chair2 = { picture: "pic", name: "stool", description: "Sit here if you da fool" };
var chair3 = { picture: "pic", name: "toadstool", description: "Sit here if you a toad" };
var chair4 = { picture: "pic", name: "stoolToad", description: "poop here if you a toad" };
var chair5 = { picture: "pic", name: "hovel", description: "squat here if you toadless" };
var chair6 = { picture: "pic", name: "bed", description: "lie here if you tired" };

var user1FavoriteChairs = [chair1, chair2, chair3];

var user3 = { firstName: "Johnny3", lastName: "Doey3", email: "3jdoe@chariMecca.com", password: "howdy3", favoriteChairs: [chair1], chairs:[chair5, chair6]};
var user2 = { firstName: "Johnny", lastName: "Doey", email: "jdoe@chariMecca.com", password: "howdy2", favoriteChairs: [chair1, chair2], favoriteUsers: [user3], chairs: [chair4] };
var user1 = { firstName: "John", lastName: "Doe", email: "jdoe@chariMecca.com", password: "howdy", favoriteChairs: user1FavoriteChairs, favoriteUsers: [user2, user3], chairs: [chair1, chair2, chair3] };

var users = [user1, user2, user3];
var chairs = [chair1, chair2, chair3];

    
///////////////////Chair stuff

app.get('/allChairs', function (req, res) {
    ChairModel.find(function (err, chairs) {
        res.json(chairs);
    });
});

app.get('/chair/:id', function (req, res) {
    ChairModel.findById(req.params.id, function (err, chair) {
        res.json(chair);
    });
});
//// ^^data base
////////////////////////////////////////
app.get('/chair', function (req, res) {
    res.json(chairs);
});

app.delete('/chair/:index', function (req, res) {
    var index = req.params['index'];
    chairs.splice(index, 1);
    res.json(chairs);
});

app.post('/chair', function (req, res) {
    var newChair = req.body;
    chairs.push(newChair);
    res.json(chairs);
});

app.put('/chair/:index', function (req, res) {
    var index = req.params['index'];
    var updatedChair = req.body;
    chairs[index] = updatedChair;
    res.json(chairs);
});

/////////////////////User stuff

app.put("/updateUser/:id", function (req, res) {
    UserModel.findById(req.params.id, function (err, user) {
        user.update(req.body, function (err, count) {
            UserModel.findById(req.params.id, function (err, user) {
                res.json(user);
            });
        });
    });
});

app.get('/user/:id', function (req, res) {
    UserModel.findById(req.params.id, function (err, user) {
        res.json(user);
    });

});

/////database ^^
app.get('/user', function (req, res) {
    res.json(users);
});



app.delete('/user/:index', function (req, res) {
    var index = req.params['index'];
    users.splice(index, 1);
    res.json(users);
});

app.post('/user', function (req, res) {
    var newUser = req.body;
    users.push(newUser);
    res.json(users);
});

app.get('/', function (req, res) {
    res.sendfile('./public/views/profile');

});


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