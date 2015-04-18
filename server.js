var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.use(express.static(__dirname + '/public'));


var chair1 = {picture: "pic", name: "throne", description: "Sit here if you da king"};
var chair2 = { picture: "pic", name: "stool", description: "Sit here if you da fool" };
var chair3 = { picture: "pic", name: "toadstool", description: "Sit here if you a toad" };

var user1FavoriteChairs = [chair1, chair2];

var user1 = {firstName: "John", lastName: "Doe", email: "jdoe@chariMecca.com", password: "howdy", favoriteChairs:user1FavoriteChairs};
var user2 = {firstName: "Johnny", lastName: "Doey", email: "jdoe@chariMecca.com", password: "howdy", favoriteChairs:chair1};

var users = [user1, user2];
var chairs = [chair1, chair2, chair3];


//Chair stuff
app.get('/chair', function (req, res) {
    console.log("testttt");
    res.json(chairs);
});

app.get('/chair/:index', function (req, res) {
    var index = req.params['index'];
    res.json(chairs[index]);
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

//User stuff
app.get('/user', function (req, res) {
    res.json(users);
});

app.get('/user/:index', function (req, res) {
    var index = req.params['index'];
    res.json(users[index]);
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

app.put('/user/:index', function (req, res) {
    var index = req.params['index'];
    var updatedUser = req.body;
    users[index] = updatedUser;
    res.json(users);
});

app.get('/', function (req, res) {
    res.sendfile('./public/views/profile');

});


var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 80;

app.listen(port, ip);