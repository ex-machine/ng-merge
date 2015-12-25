(function(__root, __factory) { if (typeof define === "function" && define.amd) { define(["angular"], __factory);} else if (typeof exports === "object") {__factory(require("angular"));} else {__factory(angular);}})(this, (function(__small$_mod_0) {
var exports = {};
'use strict';

var angular = __small$_mod_0;
var version = angular.version;

if (version.major === 1 && version.minor < 5)
	angular.merge = merge;

function merge(dst) {
	function isRegExp(value) {
		return toString.call(value) === '[object RegExp]';
	}

	function setHashKey(obj, h) {
		if (h) {
			obj.$$hashKey = h;
		} else {
			delete obj.$$hashKey;
		}
	}

	function deepExtend(dst, objs) {
		var h = dst.$$hashKey;

		for (var i = 0, ii = objs.length; i < ii; ++i) {
			var obj = objs[i];
			if (!angular.isObject(obj) && !angular.isFunction(obj)) continue;
			var keys = Object.keys(obj);
			for (var j = 0, jj = keys.length; j < jj; j++) {
				var key = keys[j];
				var src = obj[key];

				if (angular.isObject(src)) {
					if (angular.isDate(src)) {
						dst[key] = new Date(src.valueOf());
					} else if (isRegExp(src)) {
						dst[key] = new RegExp(src);
					} else if (src.nodeName) {
						dst[key] = src.cloneNode(true);
					} else if (angular.isElement(src)) {
						dst[key] = src.clone();
					} else {
						if (!angular.isObject(dst[key])) dst[key] = angular.isArray(src) ? [] : {};
						deepExtend(dst[key], [src]);
					}
				} else {
					dst[key] = src;
				}
			}
		}

		setHashKey(dst, h);
		return dst;
	}

	var argsLength = arguments.length - 1;
	var args = new Array(argsLength);
	for (var i = 0; i < argsLength; i++) {
		args[i] = arguments[i + 1];
	}

	return deepExtend(dst, args);
}

return exports;
}))