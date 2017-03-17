const path = require('path');

const express = require('express');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');
const db = require('./db');
const Place = db.Place;
const Hotel = db.Hotel;
const Activity = db.Activity;
const Restaurant = db.Restaurant;

const app = express();

app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public')));
app.use('/', routes);


Promise.all([Place.sync({force: true}), Hotel.sync({force: true}), Activity.sync({force: true}), Restaurant.sync({force: true})])
.then(function(results){
	app.listen('3000', function(){
		console.log("Listening on port 3000!");
	})
})


app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	console.error(err);
	res.render(
		"error_page", {err: err}
		);
});