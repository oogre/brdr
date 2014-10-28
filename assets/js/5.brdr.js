(function(){
	"use strict";
	/*global PASS:false */

	window.BRDR = window.BRDR || {};
	
	BRDR.tools = {
		ajax : function(request){
			request.dataType = "json";
			return $.ajax(request)
			.pipe(function(data){
				if(true === data.success){
					return $.Deferred().resolve(data);
				}else{
					return $.Deferred().reject(data);
				}
			}, function(data){
				return $.Deferred().reject(data);
			});
		}
	};

	BRDR.call = (function(){
		var _getCsrf = function(callback){
			return $.ajax({
				url : "/csrfToken"
			})
			.pipe(function(data){
				if(data._csrf){
					if(jQuery.isFunction(callback)) {
						callback(data._csrf);
					}
					return $.Deferred().resolve(data._csrf);
				}else{
					return $.Deferred().reject(data);
				}
			}, function(data){
				return $.Deferred().reject(data);
			});
		};

		
		var _get = function(url){
			return BRDR.tools.ajax({
				url : url
			})
			.pipe(function(data){
				if(Array.isArray(data.data)){
					return $.Deferred().resolve(data.data);
				}else{
					return $.Deferred().reject(data);
				}
			}, function(data){
				return $.Deferred().reject(data);
			});
		};

		var _new = function(url, data){
			return _getCsrf()
			.pipe(function(_csrf){
				data._csrf = _csrf;
				return BRDR.tools.ajax({
					url : url,
					data : data
				})
				.pipe(function(data){
					if(Array.isArray(data.data)){
						return $.Deferred().resolve(data.data);
					}else{
						return $.Deferred().reject(data);
					}
				})
			}, function(data){
				return $.Deferred().reject(data);
			});
		};

		return {
			getClients : function(id){
				return _get("/clients/index/");
			},
			getShops :  function(ownerId){
				return _get("/shops/index/"+ownerId);
			},
			getFrigoSystems :  function(ownerId){
				return _get("/frigo_systems/index/"+ownerId);
			},
			getFrigoGroups :  function(ownerId){
				return _get("/frigo_groups/index/"+ownerId);
			},
			getFrigoUnits :  function(ownerId){
				return _get("/frigo_units/index/"+ownerId);
			},


			newClient : function(data){
				return _new("/clients/create", data);
			},
			newShop : function(data){
				return _new("/shops/create", data);
			},
			newFrigoSystem : function(data){
				return _new("/frigo_systems/create", data);
			},
			newFrigoGroup : function(data){
				return _new("/frigo_groups/create", data);
			},
			newFrigoUnit : function(data){
				return _new("/frigo_units/create", data);
			}
		}
	}());
})();