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
			maxLength: 64
		},
		description : {
			type: 'string',
			required: true,
			maxLength: 1024
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
