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
			maxLength: 128,
		},
		shops : {
			collection:'shops',
			via: 'owner'
		},
		confirmed : {
			type: 'boolean',
			defaultTo : false
		},
		contacts :{
			type: 'array'
		},
		tva :{
			type: 'string',
			maxLength: 32,
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
			Clients.find({name : values.name})
			.exec(function foundClient(err, client){
				if(err)return next(err);
				if(client.length>0) return next({
						err : ["client already exist"]
					});
				return next();
			});
		}else{
			return next({
					err : ["client name needed"]
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
	*/
};
