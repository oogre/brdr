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

	"index" : function(req, res, next){
		if(req.param("ajax")){
			res.locals.layout = false;
		}
		if(!req.param("id")){
			Frigo_groups.find()
			.sort({ name: 'asc' })
			.exec(function foundGroups(err, groups){
				if(err) return res.send(400);
				return res.view({
					groups : groups,
				});
			});
		}else{
			Frigo_groups.find({owner : req.param("id")})
			.sort({ name: 'asc' })
			.exec(function foundGroups(err, groups){
				if(err) return res.send(400);
				return res.view({
					groups : groups,
				});
			});
		}
	},

	"create" : function(req, res, next){
		if(!req.param("owner")){
			console.log("/frigo_groups/create : no_owner_id");
			return res.send(400);
		}
		if(req.param("ajax")){
			res.locals.layout = false;
		}
		Frigo_groups.create({
			name : req.param("name").toLowerCase(),
			owner : req.param("owner")
		})
		.exec(
			function GroupCreated(err){
			if(err){
				console.log(err);
				return res.send(400);	
			} 
			return res.redirect("/frigo_groups/index/"+ req.param("owner") + (res.locals.layout === false ? "?ajax=true" : ""));
		});
	},

  
};
