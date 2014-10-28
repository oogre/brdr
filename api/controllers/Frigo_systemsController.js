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

	index : function(req, res, next){
		if(req.param("id")){
			Frigo_systems.find({
				owner : req.param("id")
			}, function foundSystemBelogingToShopId(err, systems){
				if(err){ 
					return res.json({
						success : false,
						message : err
					});
				}
				else if(!systems){
					return res.json({
						success : false,
						message : "no_system"
					});
				}
				return res.json({
					success : true,
					data : systems
				});
			});	
		}
		else{
			Frigo_systems.find(function foundShops(err, systems){
				return res.json({
					success : true,
					data : systems || []
				});
			});
		}
	},

	"create" : function(req, res, next){
		if(!req.param("owner")){
			return res.json({
				success : false,
				message : "no_owner_id"
			});
		}
		Frigo_systems.create(req.params.all())
		.exec(
			function createdShop(err){
			if(err){ 
				return res.json({
					success : false,
					message : err
				})
			}
			return res.redirect("/frigo_systems/index/"+req.param("owner"));
		});
	},
};
