/*
      ___     __    _ _     _       _       
     | \ \   / /_ _| (_) __| | __ _| |_ ___ 
  _  | |\ \ / / _` | | |/ _` |/ _` | __/ _ \
 | |_| | \ V / (_| | | | (_| | (_| | ||  __/
  \___/   \_/ \__,_|_|_|\__,_|\__,_|\__\___|


by Armel van Ravels and Dominique de Brabander

*/
;(function ($, window, undefined) {

	// universial name for our plugin wich we can use to make things easier. :)
	var pluginName = '_JValidate';

	// Plugin constructor.
	$.JValidate = function (element, options, callback) {
		this.element = element;
		this.settings = $.extend({}, $.JValidate.defaults, options);
		this.initialize(); // run the init
	};
	
	// Plugin default settings.
	$.JValidate.defaults = {
		// Prefix that will be used for classes
		prefix : '',

		// Callback that will be run if the element is validated with a succes
		// Default is a function that doesn't do anything
		defaultSuccess : undefined,
		
		// Callback will be run if the element is validated with a fail
		// Default is a function that doesn't do anything
		defaultError : undefined,

		// Default rules that our app will use for validating our forms
		defaultRules : {
			required : {
				'validateFunction' : function( value ){
					return value.length;
				},
				'errorCallback' : $.noop,
				'successCallback': $.noop
			},
			email : {
				'validateFunction' : function( value ){
					return (/^([a-z0-9_\.\-]+)@([\da-z\.\-]+)\.([a-z\.]{2,6})$/).test(value);
				},
				'errorCallback' : $.noop,
				'successCallback' : $.noop
			},
			url : {
				'validateFunction' : function( value ){
					return (/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/).test(value);
				},
				'errorCallback' : $.noop,
				'successCallback' : $.noop
			}
		}
	};
	
	// Plugin methods, defined on the prototype to reduce multiple function and closure creation. See -> https://developers.google.com/speed/articles/optimizing-javascript
	$.JValidate.prototype = {

		initialize : function (callback) {
			// Load rules
			this.reloadRules();
		},

		addRule : function(name, validateFunction, errorCallback, successCallback){
			// Create a tempoary rule object
			var rule = {};
			
			// Fill the temporary rule object
			rule[name] = {
				'validateFunction' : validateFunction || function () { return true; } ,
				'errorCallback' : errorCallback || this.settings.defaultError || $.noop,
				'successCallback' : successCallback || this.settings.defaultSuccess || $.noop
			};

			// Add the rule to the _rules object
			this._rules = $.extend(rule, this._rules);
		},

		validate : function(){
			// Save refference of this
			var self = this;

			$(this.element).find("input, textarea").each(function(index, ele){
				for (var prop in self._rules)
				{
					if($(ele).hasClass(self.settings.prefix + prop))
					{
						if(self._rules[prop].validateFunction($(this).val()))
						{
							self._rules[prop].successCallback(this);
						} else {
							self._rules[prop].errorCallback(this);
						}
					}
				}
			});
		},

		getRules : function(){
			return this._rules;
		},

		reloadRules : function(){
			// Copy the default rules into the rules
			this._rules = this.settings.defaultRules;

			//When there is set a defaultError or defaultSuccess apply them to the rules
			for(var rule in this._rules)
			{
				this._rules[rule].errorCallback = this.settings.defaultError || $.noop;
				this._rules[rule].successCallback = this.settings.defaultSuccess || $.noop;
			}
		},

		setErrorCallback : function(name, errorCallback){
			if($.isFunction(errorCallback)) {
				this._rules[name].errorCallback = errorCallback;
			}
		},

		setSuccessCallback : function(name, successCallback){
			if($.isFunction(successCallback)) {
				this._rules[name].successCallback = successCallback;
			}
		}
	};
	
}(jQuery, this));


