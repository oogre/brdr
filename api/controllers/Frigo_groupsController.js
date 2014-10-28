/**
 * Frigo_groupsController
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
   * (specific to Frigo_groupsController)
   */
  _config: {},

	index : function(req, res, next){
		if(req.param("id")){
			Frigo_groups.find({
				owner : req.param("id")
			}, function foundGroupBelogingToSystelId(err, groups){
				if(err){ 
					return res.json({
						success : false,
						message : err
					});
				}
				else if(!groups){
					return res.json({
						success : false,
						message : "no_group"
					});
				}
				return res.json({
					success : true,
					data : groups
				});
			});	
		}
		else{
			Frigo_groups.find(function foundShops(err, groups){
				return res.json({
					success : true,
					data : groups || []
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
		Frigo_groups.create(req.params.all())
		.exec(
			function createdShop(err){
			if(err){ 
				return res.json({
					success : false,
					message : err
				})
			}
			return res.redirect("/frigo_groups/index/"+req.param("owner"));
		});
	},

  
};
