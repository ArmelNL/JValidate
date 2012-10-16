/*
      ___     __    _ _     _       _       
     | \ \   / /_ _| (_) __| | __ _| |_ ___ 
  _  | |\ \ / / _` | | |/ _` |/ _` | __/ _ \
 | |_| | \ V / (_| | | | (_| | (_| | ||  __/
  \___/   \_/ \__,_|_|_|\__,_|\__,_|\__\___|


by Armel van Ravels and Dominique de Brabander

*/
(function( $ ){

	var defaultRules = {
		required : {
			'validateFunction': function( value ){ return value.length; },
			'errorCallback' : function(){},
			'successCallback': function(){}
		},
		email : {
			'validateFunction' : function(value){
				return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(value);
			},
			'errorCallback' : function(){},
			'successCallback' : function(){}
		},
		url : {
			'validateFunction' : function(value){
				return /_^(?:(?:https?|ftp)://)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}-\x{ffff}0-9]+-?)*[a-z\x{00a1}-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}-\x{ffff}0-9]+-?)*[a-z\x{00a1}-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}-\x{ffff}]{2,})))(?::\d{2,5})?(?:/[^\s]*)?$_iuS
/.test(value); // by @diegoperini
			},
			'errorCallback' : function(){},
			'successCallback' : function(){}
		}
	}
	var rules = {};
	var methods = {
		init : function( options ) { 
			rules = defaultRules;
		},
		validate:function( options ){

			$(this).find("input, textarea").each(function(index, element){
				for (prop in rules)
				{
					if(element.classList.contains(prop))
					{
						if(rules[prop].validateFunction($(this).val()))
						{
							rules[prop].successCallback(this);
						} else {
							rules[prop].errorCallback(this);
						}
					}
				}
			});
		},
		setErrorCallback : function(name, errorCallback){
			rules[name].errorCallback = errorCallback;
		},
		setSuccessCallback : function(name, successCallback){

			rules[name].successCallback = successCallback;
		},
		addRule: function(name, validateFunction, errorCallback, successCallback){
			var rule = {};
			rule[name] = {
				'validateFunction':validateFunction,
				'errorCallback':errorCallback || $.noop(), 
				'successCallback':successCallback || $.noop()
			};

			rules = $.extend(rule,rules);

		},
		getRules : function(){
			return rules;
		},
		resetRules: function(){
			rules = defaultRules;
		}
	};

	$.fn.jvalidate = function( method ) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.jvalidate' );
		}    

	};

})( jQuery );


