/**
 * SessionController
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
    
  'new': function(req, res){
  	
  	res.view('session/new');
  },

  create : function(req, res, next){

    if(!req.param("name")){
  		var userNameRequiredError = [{name : "userNameRequired",message: 'Your name is required'}];
  		req.session.flash = {
  			err : userNameRequiredError
  		}
  		res.redirect("/session/new");
  		return;
  	}

  	Users.findOneByName(req.param("name"), function foundUSer(err, user){
  		if(err) return next(err);

  		if(!user){
  			var noAccountError = [{name : "noAccount",message: 'Your name doesn\'t exist'}];
			req.session.flash = {
				err : noAccountError
			}
			res.redirect("/session/new");
			return;
  		}
      
      if((user.password == "" || user.password === null) && (req.param('password') === "" || req.param('password') === null)){
        userUtilities.login(req, user);
        res.redirect('/users/show/'+user.id);
      }else{
        require('bcrypt').compare(req.param('password'), user.password, function(err, valid){
          if(err) return next(err);

          if(!valid){
            var userPasswordMismatchError = [{name : "userPasswordMismatchError",message: 'Invalid username / password combination'}];
            req.session.flash = {
              err : userPasswordMismatchError
  				  }
  				  res.redirect("/session/new");
  				  return;
    			}
    			user.signin(req.session, function (err, onlineUser){
            if(err) return next(err);
            return res.redirect('/users/show/'+onlineUser.id);
          });
          
        });
      }
  	});
  }, 

  destroy : function(req, res, next){
    userUtilities.logout(req);
  	res.redirect('session/new');
  }


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SessionController)
   */
 // _config: {}

  
};
