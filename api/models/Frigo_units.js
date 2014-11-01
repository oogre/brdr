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
		owner : {
			model: 'frigo_groups',
			required: true,
		}
	},
	beforeCreate : function(values, next){
		if(values.name){
			Frigo_units.find({
				name : values.name,
				owner : values.owner
			 })
			.exec(function foundItem(err, item){
				if(err)return next(err);
				if(item.length>0) return next({
						err : ["frigo unit already exist"]
					});
				return next();
			});
		}else{
			return next({
					err : ["frigo unit name needed"]
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
