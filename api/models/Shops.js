/**
 * Users
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	schema:true,
	attributes : {
		name : {
			type: 'string',
			required: true,
			maxLength: 128
		},

		frigo_system : {
			collection:'frigo_systems',
			via: 'owner'
		},
		owner : {
			model : 'clients',
			required: true
		},
		contacts :{
			type: 'array'
		},
		addres :{
			type: 'string',
			maxLength: 64,
		},
		zipcode :{
			type: 'string',
			maxLength: 16,
		},
		city :{
			type: 'string',
			maxLength: 32,
		},
		country :{
			type: 'string',
			maxLength: 32,
		}
	},
	beforeCreate : function(values, next){
		if(values.name){
			Shops.find({
				name : values.name,
				owner : values.owner
			 })
			.exec(function foundItem(err, item){
				if(err)return next(err);
				if(item.length>0) return next({
						err : ["shop already exist"]
					});
				return next();
			});
		}else{
			return next({
					err : ["shop name needed"]
				});
		}
	}
	/*
        type: 'string' || 'integer',
        unique: true,
        maxLength: 20,
        minLength: 5,
        primaryKey: true,
        required: true,
        index : true,
	*/
};
