var express = require('express');
var router = express.Router();

const db = require('../db');
const Place = db.Place;
const Hotel = db.Hotel;
const Activity = db.Activity;
const Restaurant = db.Restaurant;

router.get('/', function(req, res, next){
	Promise.all([Hotel.all(), Activity.all(), Restaurant.all()])
	.then(function(results){
		res.render('home', {hotels: results[0], activites: results[1], restaurants: results[2]});
	});
})

module.exports = router;