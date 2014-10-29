/**
 * Users
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	attributes : {
		client : {
			model : 'clients',
			required : true,
		},
		shop : {
			model : 'shops'
		},
		frigo_system : {
			model : 'frigo_systems',
		},
		frigo_group : {
			model : 'frigo_groups',
		},
		frigo_unit : {
			model : 'frigo_units',
		},
		work_type : {
			model : 'work_types',
			required : true,
		},
		done : {
			type: 'boolean',
			defaultTo : false
		},
		note : {
			type : 'string',
			maxLength : 4096,
		},
		date_todo : {
			type: 'datetime',
			required : true,
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
