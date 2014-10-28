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
		},
		shops : {
			collection:'shops',
			via: 'owner'
		},
		confirmed : {
			type: 'boolean',
			defaultTo : false
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
