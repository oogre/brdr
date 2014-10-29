/**
 * WorksController
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
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to WorksController)
   */
	_config: {},


	"new" : function(req, res, next){
		return res.view({
			title : "Creéé un nouveau travail"
		});
	},

	"create" : function(req, res, next){
		console.log(req.params.all());
	},

	"index" : function(req, res, next){
		Works.find(function foundWorks(err, works){
			if(err) return next(err);
			return res.view({
				works : works
			});
		});
	}
};
