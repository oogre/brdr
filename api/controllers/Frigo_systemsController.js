/**
 * Frigo_systemsController
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
   * (specific to Frigo_systemsController)
   */
  _config: {},

	"index" : function(req, res, next){
		if(req.param("ajax")){
			res.locals.layout = false;
		}
		if(!req.param("id")){
			Frigo_systems.find()
			.sort({ name: 'asc' })
			.exec(function foundSystems(err, systems){
				if(err) return res.send(400);
				return res.view({
					systems : systems,
				});
			});
		}else{
			Frigo_systems.find({owner : req.param("id")})
			.sort({ name: 'asc' })
			.exec(function foundSystems(err, systems){
				if(err) return res.send(400);
				return res.view({
					systems : systems,
				});
			});
		}
	},

	"create" : function(req, res, next){
		if(!req.param("owner")){
			console.log("/frigo_systems/create : no_owner_id");
			return res.send(400);
		}
		if(req.param("ajax")){
			res.locals.layout = false;
		}
		Frigo_systems.create({
			name : req.param("name").toLowerCase(),
			owner : req.param("owner")
		})
		.exec(
			function SystemCreated(err){
			if(err){
				console.log(err);
				return res.send(400);	
			} 
			return res.redirect("/frigo_systems/index/"+ req.param("owner") + (res.locals.layout === false ? "?ajax=true" : ""));
		});
	},
};
