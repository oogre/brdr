/**
 * Users
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	attributes : {
		user : {
			model : 'users',
			required : true,
		},
		work : {
			model : 'works',
			required : true,
		},
		start_time : {
			type : 'datetime',
			required : true,
		},
		stop_time : {
			type : 'datetime'
		},
		
		wiki_thread_id : {
			type: 'integer'
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
