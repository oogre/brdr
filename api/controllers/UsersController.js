/**
 * UsersController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
	'new' : function(req, res){
		res.view();
	},

	create : function(req, res){
		var obj = {};
		if(req.session.User.admin){
			obj = {
				name : req.params("name"),
				password : req.params("password"),
				admin : req.params("admin")
			};
		} else {
			obj = {
				name : req.params("name"),
				password : req.params("password")
			};
		}

		Users.create(obj, function(err, user){
			if(err){
				console.log(err);
				req.session.flash = {
					err : err
				};
				return res.redirect('/users/new');
			}
			user.signup(req.session, function (err, onlineUser){
				if(err) return next(err);
				req.session.flash = {
					ok : {
						message : 'accountCreationOk',
						data : null
					}
				};
				return res.redirect('/users/show/'+onlineUser.id);
			});
		});
	},

	show : function(req, res, next){
		Users.findOne(req.param('id'), function foundUser(err, user){
			if(err) return next(err);
			if(!user) return next('User doesn\'t exist');
			res.view({
				user : user
			});
		});
	},

	index : function(req, res, next){
		Users.find(function foundUser(err, users){
			if(err) return next(err);
			res.view({
				users : users
			});
		});
	},

	edit : function(req, res, next){

		Users.findOne(req.param('id'), function foundUser(err, user){
			if(err) return next(err);
			if(!user) return next();
			res.view({
				user : user
			});
		});
	},

	update : function(req, res, next){
		var obj = {};
		if(req.session.User.admin){
			obj = {
				name : req.params("name"),
				password : req.params("password"),
				admin : req.params("admin")
			};
		} else {
			obj = {
				name : req.params("name"),
				password : req.params("password")
			};
		}
		Users.update(req.param('id'), obj, function userUpdated(err){
			if(err) res.redirect('/users/edit/' + req.param('id'));

			res.redirect('/users/show/' + req.param('id'));
		});
	},

	destroy : function(req, res, next){
		Users.findOne(req.param('id'), function foundUser(err, user){
			if(err) return next(err);
			if(!user) return next('User doesn\'t exist');
			Users.destroy(req.param('id'), function userDestroyed(err){
				if(err) return next(err);
			});
			res.redirect('/users');
		});
	}

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UsersController)
   */
  //_config: {}

  
};
