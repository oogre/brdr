/**
 * Users
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	attributes : {
		name : {
			type: 'string',
			required: true,
			unique: true,
			maxLength: 128,
			index : true,
		},

		frigo_system : {
			collection:'frigo_systems',
			via: 'owner'
		},
		owner : {
			model : 'clients',
			required: true
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
