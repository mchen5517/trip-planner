const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/tripplanner', { logging: false });

var Place = db.define('place',
{ 
	address : { 
		type: Sequelize.STRING
	}, 
	city : { 
		type: Sequelize.STRING
	},
	state: { 
		type: Sequelize.STRING
	},
	phone: { 
		type: Sequelize.STRING
	},
	location: {
		type: Sequelize.ARRAY(Sequelize.FLOAT)
	}
}, {
	instanceMethods: {},
	getterMethods: {},
	classMethods: {},
	hooks: {}
}); 

var Hotel = db.define('hotel',
{ 
	name : { 
		type: Sequelize.STRING
	}, 
	num_stars : { 
		type: Sequelize.FLOAT
	},
	amenities : { 
		type: Sequelize.STRING
	}
}, {
	instanceMethods: {},
	getterMethods: {},
	classMethods: {
		all: function(){
			return this.findAll();
		}
	},
	hooks: {}
}); 

var Activity = db.define('activity',
{ 
	name : { 
		type: Sequelize.STRING
	}, 
	age_range : { 
		type: Sequelize.STRING
	}
}, {
	instanceMethods: {},
	getterMethods: {},
	classMethods: {
		all: function(){
			return this.findAll();
		}
	},
	hooks: {}
}); 

var Restaurant = db.define('restaurant', 
{ 
	name : { 
		type: Sequelize.STRING
	}, 
	cuisine : { 
		type: Sequelize.STRING
	},
	price : { 
		type: Sequelize.INTEGER
	}
}, {
	instanceMethods: {},
	getterMethods: {},
	classMethods: {
		all: function(){
			return this.findAll();
		}
	},
	hooks: {}
}); 

Hotel.belongsTo(Place);
Activity.belongsTo(Place);
Restaurant.belongsTo(Place);


module.exports = {
	Place: Place,
	Hotel: Hotel,
	Activity: Activity,
	Restaurant: Restaurant,
	db: db
};