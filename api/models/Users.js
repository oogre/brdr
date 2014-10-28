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
			maxLength: 16,
			index : true,
		},
		encryptedPassword:{
			type:"String"
  		},
		wiki_thread_id : {
			type: 'integer',
		},
		online : {
			type : "boolean",
			defaultsTo : false
		},
		admin : {
			type : "boolean",
			defaultsTo : false
		},
		toJSON : function(){
			var obj = this.toObject();
			delete obj.encryptedPassword;
			delete obj.confirmation;
			delete obj._csrf;
			return obj;
		}
	},

	initSession : function(session){
      var birthDate = new Date()
      var deathDate = new Date(birthDate.getTime() + sails.config.session.cookie.maxAge);
      session.cookie.expires = deathDate;
      session.authenticated = true;
      session.User = this.toJSON();
      this.online = true;
      return this;
    },

	destroySession : function(session){
      this.online = false;
      session.destroy();
      return this;
    },

    signup : function(session, next){
      this
      .initSession(session)
      .save(function saved(err, user){
        if(err){
          user.destroySession(session);
          return next(err);
        }
        User.publishCreate(user.toJSON());
        return next(null, user);
      });
    },

    signin : function(session, next){
      this
      .initSession(session)
      .save(function saved(err, user){
        if(err){
          user.destroySession(session);
          return callback(err); 
        }
        User.publishUpdate(user.id,{ 
          online : user.online 
        });
        return next(null, user);
      });
    },

    signout : function (session, next){
      this
      .destroySession(session)
      .save(function saved(err, user){
        if(err){
          return next(err);
        }
        User.publishUpdate(user.id, { 
          online : user.online 
        });
        return next(null, user);
      });
    },

	beforeCreate : function(values, next){
		if(values.password){
			if(values.password != values.confirmation){
				return next("Password doesn't match password confirmation.")
			}
			require('bcrypt')
			.hash(values.password, 10, function passwordEncrypted(err, encryptedPassword){
				if(err) return next(err);
				values.password = encryptedPassword;
				return next();
			});
		}else{
			return next();
		}
	},
	
	beforeUpdate : function(values, next){
		if(values.password){
			if(values.password != values.confirmation){
				return next("Password doesn't match password confirmation.")
			}
			require('bcrypt')
			.hash(values.password, 10, function passwordEncrypted(err, encryptedPassword){
				if(err) return next(err);
				values.password = encryptedPassword;
				return next();
			});
		}else{
			return next();
		}
	}

	/*
		default : false
        type: 'string' || 'integer',
        unique: true,
        maxLength: 20,
        minLength: 5,
        primaryKey: true,
        required: true,
	*/
};
