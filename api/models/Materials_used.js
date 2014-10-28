/**
 * Users
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	attributes : {
		work : {
			model: 'works',
			required: true
		},
		material : {	
			model:'materials',
			required: true
		},
		quantity : {
			type: 'float',
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
