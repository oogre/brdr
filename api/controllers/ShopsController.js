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
    

	"index" : function(req, res, next){
		if(req.param("ajax")){
			res.locals.layout = false;
		}
		if(!req.param("id")){
			Shops.find()
			.sort({ name: 'asc' })
			.exec(function foundShops(err, shops){
				if(err) return res.send(400);
				return res.view({
					shops : shops,
				});
			});
		}else{
			Shops.find({owner : req.param("id")})
			.sort({ name: 'asc' })
			.exec(function foundShops(err, shops){
				if(err) return res.send(400);
				return res.view({
					shops : shops,
				});
			});
		}
	},

	"create" : function(req, res, next){
		if(!req.param("owner")){
			console.log("/shops/create : no_owner_id");
			return res.send(400);
		}
		if(req.param("ajax")){
			res.locals.layout = false;
		}
		Shops.create({
			name : req.param("name").toLowerCase(),
			owner : req.param("owner")
		})
		.exec(
			function ShopCreated(err){
			if(err){
				console.log(err);
				return res.send(400);	
			} 
			return res.redirect("/shops/index/"+ req.param("owner") + (res.locals.layout === false ? "?ajax=true" : ""));
		});
	},

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ShopsController)
   */
  _config: {}

  
};
