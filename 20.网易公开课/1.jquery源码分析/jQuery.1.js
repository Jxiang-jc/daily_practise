/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/ 选择器引擎
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */

// 闭包
( function( global, factory ) {

	"use strict"; // js脚本语言

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
// 语法。语义
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
	var
		version = "3.3.1",

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {

			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context ); // new用来创建新的内存孔空间
		}

		jQuery.fn = jQuery.prototype = {

			// The current version of jQuery being used
			jquery: version,
		
			constructor: jQuery,
		
			// The default length of a jQuery object is 0
			length: 0,

			addClass: function () {
				console.log('this is addClass');
				return this; // 作用域 内存学习法
			},

			css: function () {
				console.log('this is css');
				return this;
			},

			on: function () {
				console.log('this is on');
				return this;
			}
		
		};

	var rootjQuery,

		
	init = jQuery.fn.init = function( selector, context, root ) {
		// 创建对象
		return []
	}
	
	init.prototype = jQuery.fn;

	rootjQuery = jQuery(document)



	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		// window 上下文
		window.jQuery = window.$ = jQuery;
	}


	return jQuery;
})

// window.a = 10
// this.a = 10 
// this ==== window
// 浏览器环境下 全局是window
// node环境下 全局是module
// 作者想要告诉，jq不一定要运行在浏览器， 也就是不管在任何环境运行， global都能指上下文