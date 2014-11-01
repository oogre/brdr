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
			title : "Créé un nouveau travail"
		});
	},

	"create" : function(req, res, next){
		if(req.param("ajax")){
			res.locals.layout = false;
		}
		Works.create({
			client : req.param("clients"),
			shop : req.param("shops"),
			frigo_system : req.param("frigo_systems"),
			frigo_group : req.param("frigo_groups"),
			frigo_unit : req.param("frigo_units")
		})
		.exec(
			function ClientCreated(err, work){
			if(err || !work){
				console.log(err);
				console.log(work);
				return res.send(400);	
			} 
			return res.json({
				success :true,
				url : "/works/show/"+work.id
			});
		});
	},

	"index" : function(req, res, next){
		if(req.param("ajax")){
			res.locals.layout = false;
		}
		Works.find()
		.sort({ date_todo: 'asc' })
		.populate('client')
		.populate('shop')
		.populate('frigo_system')
		.populate('frigo_group')
		.populate('frigo_unit')
		.exec(function foundWorks(err, works){
			if(err) return res.send(400);
			works = works.map(function(work){
				work.name = work.name || (work.client.name +" "+ (work.shop ? (work.shop.name + " ") : "") + (work.frigo_system ? (work.frigo_system.name + " ") : "") + (work.frigo_group ? (work.frigo_group.name + " ") : "") + (work.frigo_unit ? (work.frigo_unit.name + " ") : ""));
				return work;
			});
			return res.view({
				title : "Liste de travaux en cours",
				works : works,
			});
		});
	},
	"show" : function(req, res, next){
		if(req.param("ajax")){
			res.locals.layout = false;
		}
		if(!req.param("id")){
			return res.redirect("/works/index/"+(req.param("ajax") ? "?ajax=true" : ""));
		}
		Works.findOne({
			id : req.param("id")
		})
		.populate('client')
		.populate('shop')
		.populate('frigo_system')
		.populate('frigo_group')
		.populate('frigo_unit')
		.exec(function foundWork(err, work){
			if(err || !work) {
				console.log(err);
				console.log(work);
				return res.redirect("/works/index/"+(req.param("ajax") ? "?ajax=true" : ""));
			}
			Work_types.find()
			.exec(function foundWorkType(err, workTypes){
				if(err) return next(err);
				work.name = work.name || (work.client.name +" "+ (work.shop ? (work.shop.name + " ") : "") + (work.frigo_system ? (work.frigo_system.name + " ") : "") + (work.frigo_group ? (work.frigo_group.name + " ") : "") + (work.frigo_unit ? (work.frigo_unit.name + " ") : ""));
				return res.view({
					title : "Fiche de travail",
					work : work,
					workTypes : workTypes,
				});				
			});
		});
	}
};
