/**
 * ShopsController
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
    
	index : function(req, res, next){
		if(req.param("id")){
			Shops.find({owner : req.param("id")}, function foundShopBelogingToClientId(err, shops){
				if(err){ 
					return res.json({
						success : false,
						message : err
					});
				}
				else if(!shops){
					return res.json({
						success : false,
						message : "no_shop"
					});
				}
				return res.json({
					success : true,
					data : shops
				});
			});	
		}
		else{
			Shops.find(function foundShops(err, shops){
				return res.json({
					success : true,
					data : shops || []
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
		Shops.create(req.params.all())
		.exec(
			function createdShop(err){
			if(err){ 
				return res.json({
					success : false,
					message : err
				})
			}
			return res.redirect("/shops/index/"+req.param("owner"));
		});
	},

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ShopsController)
   */
  _config: {}

  
};
