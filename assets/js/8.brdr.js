(function(){
	"use strict";
	/*global PASS:false */

	window.BRDR = window.BRDR || {};

	BRDR.tools = {
		ajax : function(request){
			request.dataType = "json";
			request.data = request.data || {};
			request.data.ajax = true;
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
		},
		partial : function(request){
			request.dataType = "html";
			request.data = request.data || {};
			request.data.ajax = true;
			return $.ajax(request)
			.pipe(function(data){
				return $.Deferred().resolve(data);
			}, function(data){
				return $.Deferred().reject(data);
			});
		},

		handlers : {
			selectItem : function(elem){
				$(elem).parent()
				.find("tr")
				.removeClass("info")
				.removeClass("active");
				$(elem).addClass("info").addClass("active");
			},
			createItemIntoPannel : function(elem){
				var action = $(elem).attr("data-onsuccess");	
				var $ref = $(elem).parent();
				var date = new Date();
				if($ref.find("tr[data-db-row-name='id']").length == 0 || $ref.find("tr[data-db-row-name='id']").attr("data-db-row-value")){
					$ref.find("table")
					.prepend(	"<tr data-db-row-name='id'>"+
								"	<td data-db-row-name='name'></td>"+
								"	<td data-db-row-name='createdAt'></td>"+
								"</tr>" )
					.find("tr[data-db-row-name='id']")
					.first()
					.find("td[data-db-row-name='name']")
					.html($ref.find(".hidden-new-form").html())
					.next()
					.text(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
					$ref.find("table form")
					.on("submit", function(event){
						var $form = $(event.target);
						var selector = "[data-db-row-name='name'][data-db-row-value='"+event.target.name.value.replace(' ', '_').toLowerCase()+"']"; 
						var success = function(data){
							$form.find("[type='submit']").toggleClass("btn-success").toggleClass("btn-default");
							setTimeout(function(){
								var position = $ref.parent()
								.empty()
								.append(data)
								.find(selector)
								.parent()
								.addClass("active")
								.addClass("info")
								.position();
								// SCROLLTO
							}, 500);
						};
						var fail = function(){
							$form.find("[type='submit']").toggleClass("btn-warning").toggleClass("btn-default");
							setTimeout(function(){
								var position = $ref.find(selector)
								.parent()
								.addClass("active")
								.addClass("info")
								.position() || {};
								$ref.parent().scrollTop(position.top);
								$form.parent()
								.parent()
								.remove();
							}, 500);
						};

						if($ref.find(selector).length>0){
							fail();
							return false;
						}

						BRDR.call[action]({
							name : event.target.name.value,
							owner : $ref.parent().prev().find("table .active[data-db-row-name='id']").attr("data-db-row-value")
						})
						.done(success)
						.fail(fail);
						return false;
					})
					.on("reset", function(){
						$(this).parent().parent().remove();
						return false;
					});
				}
			}
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
			return BRDR.tools.partial({
				url : url
			})
			.pipe(function(data){
				return $.Deferred().resolve(data);
			}, function(data){
				console.error("error : " + url);
				return $.Deferred().reject(data);
			});
		};

		var _new = function(url, data){
			return _getCsrf()
			.pipe(function(_csrf){
				data._csrf = _csrf;
				return BRDR.tools.partial({
					url : url,
					data : data
				})
				.pipe(function(data){
					return $.Deferred().resolve(data);
				})
			}, function(data){
				return $.Deferred().reject(data);
			});
		};

		var _create = function(url, data){
			return _getCsrf()
			.pipe(function(_csrf){
				data._csrf = _csrf;
				return BRDR.tools.ajax({
					url : url,
					data : data
				})
				.pipe(function(data){
					return $.Deferred().resolve(data);
				})
			}, function(data){
				return $.Deferred().reject(data);
			});
		}

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
			},

			newWork : function(data){
				return _create("/works/create", data);
			}
		}
	}());
})();