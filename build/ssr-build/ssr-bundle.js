module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "/QC5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribers", function() { return subscribers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentUrl", function() { return getCurrentUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "route", function() { return route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);


var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index;
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
	vnode.index = index;
	vnode.rank = rankChild(vnode);
	return vnode.attributes;
}

function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
	return segment.charAt(0) == ':' ? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4 : 5;
}

function rank(path) {
	return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
	return vnode.attributes.default ? 0 : rank(vnode.attributes.path);
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.filter(prepareVNodeForRanking).sort(pathRankSort).map(function (vnode) {
			var matches = exec(url, vnode.attributes.path, vnode.attributes);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					assign(newProps, matches);
					delete newProps.ref;
					delete newProps.key;
					return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

var Link = function Link(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a', assign({ onClick: handleLinkClick }, props));
};

var Route = function Route(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

/* harmony default export */ __webpack_exports__["default"] = (Router);
//# sourceMappingURL=preact-router.es.js.map

/***/ }),

/***/ "FitW":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__aIRur","titleArea":"titleArea__2joNt","subtitleArea":"subtitleArea__2O2tr","social":"social__fo7_8","firstSection":"firstSection__1yS94","secondSection":"secondSection__3mLlH","logo":"logo__1p3qn","photoArea":"photoArea__2Fu5a","summaryArea":"summaryArea__2wKzK","blankArea":"blankArea__vvrvi","sectionHeader":"sectionHeader__8UEmS"};

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./style/index.css
var style = __webpack_require__("rq4c");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// EXTERNAL MODULE: ../node_modules/preact-router/dist/preact-router.es.js
var preact_router_es = __webpack_require__("/QC5");

// EXTERNAL MODULE: ../node_modules/preact-router/match.js
var match = __webpack_require__("sw5u");
var match_default = /*#__PURE__*/__webpack_require__.n(match);

// EXTERNAL MODULE: ./components/header/style.css
var header_style = __webpack_require__("u3et");
var header_style_default = /*#__PURE__*/__webpack_require__.n(header_style);

// CONCATENATED MODULE: ./components/header/index.js





var header__ref = Object(preact_min["h"])(
	'h1',
	null,
	'Farmilo Strategy'
);

var header_Header = function Header() {
	return Object(preact_min["h"])(
		'header',
		{ 'class': header_style_default.a.header },
		header__ref,
		Object(preact_min["h"])(
			'nav',
			null,
			Object(preact_min["h"])(
				match["Link"],
				{ activeClassName: header_style_default.a.active, href: '/' },
				'Home'
			),
			Object(preact_min["h"])(
				match["Link"],
				{ activeClassName: header_style_default.a.active, href: '/ip/' },
				'Intellectual Property Services'
			),
			Object(preact_min["h"])(
				match["Link"],
				{ activeClassName: header_style_default.a.active, href: '/management/' },
				'Management Consulting Services'
			),
			Object(preact_min["h"])(
				match["Link"],
				{ activeClassName: header_style_default.a.active, href: '/profile/' },
				'About'
			)
		)
	);
};

/* harmony default export */ var header = (header_Header);
// EXTERNAL MODULE: ./routes/home/style.css
var home_style = __webpack_require__("ZAL5");
var home_style_default = /*#__PURE__*/__webpack_require__.n(home_style);

// CONCATENATED MODULE: ./components/social.js



var social_Twitter = function Twitter(_ref) {
    var color1 = _ref.color1,
        color2 = _ref.color2;

    return Object(preact_min["h"])(
        "svg",
        { version: "1.1", xmlns: "http://www.w3.org/2000/svg", width: "70px", height: "80px", viewBox: "-50 0 500 500" },
        Object(preact_min["h"])(
            "g",
            { id: "Dark_Blue" },
            Object(preact_min["h"])("path", { style: { fill: color1 }, d: "M350,400H50c-27.6,0-50-22.4-50-50V50C0,22.4,22.4,0,50,0h300c27.6,0,50,22.4,50,50v300\r C400,377.6,377.6,400,350,400z" })
        ),
        Object(preact_min["h"])(
            "g",
            { id: "Logo__x2014__FIXED" },
            Object(preact_min["h"])("path", { style: { fill: color2 }, d: "M153.6,301.6c94.3,0,145.9-78.2,145.9-145.9c0-2.2,0-4.4-0.1-6.6c10-7.2,18.7-16.3,25.6-26.6\r c-9.2,4.1-19.1,6.8-29.5,8.1c10.6-6.3,18.7-16.4,22.6-28.4c-9.9,5.9-20.9,10.1-32.6,12.4c-9.4-10-22.7-16.2-37.4-16.2\r c-28.3,0-51.3,23-51.3,51.3c0,4,0.5,7.9,1.3,11.7c-42.6-2.1-80.4-22.6-105.7-53.6c-4.4,7.6-6.9,16.4-6.9,25.8\r c0,17.8,9.1,33.5,22.8,42.7c-8.4-0.3-16.3-2.6-23.2-6.4c0,0.2,0,0.4,0,0.7c0,24.8,17.7,45.6,41.1,50.3c-4.3,1.2-8.8,1.8-13.5,1.8\r c-3.3,0-6.5-0.3-9.6-0.9c6.5,20.4,25.5,35.2,47.9,35.6c-17.6,13.8-39.7,22-63.7,22c-4.1,0-8.2-0.2-12.2-0.7\r C97.7,293.1,124.7,301.6,153.6,301.6" })
        )
    );
};

var social_LinkedIn = function LinkedIn(_ref2) {
    var color2 = _ref2.color2,
        color1 = _ref2.color1;

    return Object(preact_min["h"])(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", width: "60px", height: "80px", viewBox: "0 0 460 640" },
        Object(preact_min["h"])(
            "g",
            null,
            Object(preact_min["h"])("path", { style: { fill: color1 }, d: "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5\r 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3" })
        ),
        Object(preact_min["h"])(
            "g",
            null,
            Object(preact_min["h"])("path", { style: { fill: color2 }, d: "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5\r 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9\r 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6\r 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" })
        )
    );
};

var social_GitHub = function GitHub(_ref3) {
    var color2 = _ref3.color2,
        color1 = _ref3.color1;

    return Object(preact_min["h"])(
        "svg",
        { width: "60px", height: "80px", viewBox: "200 200 1648 2048", xmlns: "http://www.w3.org/2000/svg" },
        Object(preact_min["h"])(
            "g",
            null,
            Object(preact_min["h"])("path", { style: { fill: color1 }, d: "M 300 500 v 1275 h 1275 v -1275 h -960 z" })
        ),
        Object(preact_min["h"])(
            "g",
            null,
            Object(preact_min["h"])("path", { style: { fill: color2 },
                d: "M 650 1480 q -8 9 -20 -3 -13 -11 -4 -19 8 -9 20 3 12 11 4 19z\r m -42 -61 q9 12 0 19 -8 6 -17 -7 t 0 -18 q 9 -7 17 6z\r m -61 -60 q -5 7 -13 2 -10 -5 -7 -12 3 -5 13 -2 10 5 7 12z\r m 31 34 q -6 7 -16 -3 -9 -11 -2 -16 6-6 16 3 9 11 2 16z\r m 129 112 q -4 12 -19 6 -17 -4 -13 -15 t 19 -7 q 16 5 13 16z\r m 63 5 q 0 11 -16 11 -17 2 -17 -11 0 -11 16 -11 17 -2 17 11z\r m 58 -10 q 2 10 -14 14 t -18 -8 14 -15 q 16-2 18 9z\r m 964 -956 v 960 q 0 119 -84.5 203.5 t -203.5 84.5 h -224 q -16 0 -24.5 -1 t -19.5 -5 -16 -14.5 -5 -27.5 v -239 \r q 0 -97 -52 -142 57 -6 102.5 -18 t 94 -39 81 -66.5 53 -105 20.5 -150.5 q 0 -121 -79 -206 37 -91 -8 -204 -28 -9 -81 11\r t -92 44 l -38 24 q-93 -26 -192 -26 t -192 26 q -16 -11 -42.5 -27 t -83.5 -38.5 -86 -13.5 q -44 113 -7 204 -79 85 -79 206 0 85 20.5 150\r t 52.5 105 80.5 67 94 39 102.5 18 q-40 36 -49 103 -21 10 -45 15 t-57 5 -65.5 -21.5 -55.5 -62.5 q -19 -32 -48.5 -52\r t -49.5 -24 l -20 -3 q -21 0 -29 4.5 t -5 11.5 9 14 13 12 l 7 5 q 22 10 43.5 38 t 31.5 51 l 10 23 q 13 38 44 61.5\r t 67 30 69.5 7 55.5 -3.5 l 23 -4 q 0 38 .5 103 t .5 68 q 0 22 -11 33.5 t -22 13 -33 1.5 h -224 q -119 0 -203.5 -84.5\r t -84.5 -203.5 v -960 q 0 -119 84.5 -203.5 t 203.5 -84.5 h 960 q 119 0 203.5 84.5 t 84.5 203.5z" })
        )
    );
};

var social_OutLink = function OutLink(_ref4) {
    var color1 = _ref4.color1,
        color2 = _ref4.color2;
    return Object(preact_min["h"])(
        "svg",
        { width: "10px", height: "20px", viewBox: "0 0 512 512", xmlns: "http://www.w3.org/2000/svg" },
        Object(preact_min["h"])(
            "g",
            null,
            Object(preact_min["h"])("path", { style: { stroke: color2, fill: color1 }, d: "M392.857,292.354h-18.274c-2.669,0-4.859,0.855-6.563,2.573c-1.718,1.708-2.573,3.897-2.573,6.563v91.361\r c0,12.563-4.47,23.315-13.415,32.262c-8.945,8.945-19.701,13.414-32.264,13.414H82.224c-12.562,0-23.317-4.469-32.264-13.414\r c-8.945-8.946-13.417-19.698-13.417-32.262V155.31c0-12.562,4.471-23.313,13.417-32.259c8.947-8.947,19.702-13.418,32.264-13.418\r h200.994c2.669,0,4.859-0.859,6.57-2.57c1.711-1.713,2.566-3.9,2.566-6.567V82.221c0-2.662-0.855-4.853-2.566-6.563\r c-1.711-1.713-3.901-2.568-6.57-2.568H82.224c-22.648,0-42.016,8.042-58.102,24.125C8.042,113.297,0,132.665,0,155.313v237.542\r c0,22.647,8.042,42.018,24.123,58.095c16.086,16.084,35.454,24.13,58.102,24.13h237.543c22.647,0,42.017-8.046,58.101-24.13\r c16.085-16.077,24.127-35.447,24.127-58.095v-91.358c0-2.669-0.856-4.859-2.574-6.57\r C397.709,293.209,395.519,292.354,392.857,292.354z" }),
            Object(preact_min["h"])("path", { style: { stroke: color2, fill: color1 }, d: "M506.199,41.971c-3.617-3.617-7.905-5.424-12.85-5.424H347.171c-4.948,0-9.233,1.807-12.847,5.424\r c-3.617,3.615-5.428,7.898-5.428,12.847s1.811,9.233,5.428,12.85l50.247,50.248L198.424,304.067\r c-1.906,1.903-2.856,4.093-2.856,6.563c0,2.479,0.953,4.668,2.856,6.571l32.548,32.544c1.903,1.903,4.093,2.852,6.567,2.852\r s4.665-0.948,6.567-2.852l186.148-186.148l50.251,50.248c3.614,3.617,7.898,5.426,12.847,5.426s9.233-1.809,12.851-5.426\r c3.617-3.616,5.424-7.898,5.424-12.847V54.818C511.626,49.866,509.813,45.586,506.199,41.971z" })
        )
    );
};

var social_Icon = function Icon(_ref5) {
    var name = _ref5.name,
        foreground = _ref5.foreground,
        background = _ref5.background;

    var icons = {
        Twitter: Object(preact_min["h"])(social_Twitter, { color1: foreground, color2: background }),
        LinkedIn: Object(preact_min["h"])(social_LinkedIn, { color1: foreground, color2: background }),
        GitHub: Object(preact_min["h"])(social_GitHub, { color1: foreground, color2: background }),
        OutLink: Object(preact_min["h"])(social_OutLink, { color1: foreground, color2: background })
    };
    return icons[name];
};

/* harmony default export */ var social = (social_Icon);
// CONCATENATED MODULE: ./routes/home/index.js





var home__ref = Object(preact_min["h"])(
	'h1',
	null,
	'Farmilo Strategy'
);

var home__ref2 = Object(preact_min["h"])(
	'h2',
	null,
	'Solutions through persistence'
);

var home__ref3 = Object(preact_min["h"])(
	'div',
	null,
	Object(preact_min["h"])(
		'a',
		{ href: 'https://twitter.com/billfarmilo' },
		Object(preact_min["h"])(social, { name: 'Twitter', foreground: '#1DA1F2', background: '#FFFFFF' })
	),
	Object(preact_min["h"])(
		'a',
		{ href: 'https://ca.linkedin.com/in/bill-farmilo-324b081' },
		Object(preact_min["h"])(social, { name: 'LinkedIn', foreground: '#FFFFFF', background: '#0077b5' })
	),
	Object(preact_min["h"])(
		'a',
		{ href: 'https://github.com/bfarmilo' },
		Object(preact_min["h"])(social, { name: 'GitHub', foreground: '#FFFFFF', background: '#1B1817' })
	)
);

var home__ref4 = Object(preact_min["h"])(
	'p',
	null,
	'Are you feeling stuck with a business project, improvement initiative, or licensing program that you wish you\'d started last quarter, or last year?'
);

var home__ref5 = Object(preact_min["h"])(
	'p',
	null,
	'Over the past 25 years we have supported clients in their Patent Acquisition, Licensing and Litigation programs, from due diligence to target selection to license negotiations to IPR\'s and technical review of invalidity and infringement arguments.'
);

var _ref6 = Object(preact_min["h"])(
	'p',
	null,
	'For 15 of those years we have directly built and managed an international technical team of software and hardware engineers and consultants spread between Asia, Europe and North America, navigating the delicate issues of integrating teams across many time zones, launching and managing initiatives to improve productivity, communication, and alignment with business goals.'
);

var _ref7 = Object(preact_min["h"])(
	'p',
	null,
	'We believe that every situation is unique, with its own challenges and opportunities. That\u2019s why we put a premium on listening and understanding. That\u2019s why we work with you and your team to develop a bespoke solution. Your goals become our goals.'
);

var _ref8 = Object(preact_min["h"])(
	'p',
	null,
	'Let us help your business realize its potential. Let\'s get that tree in the ground.'
);

var home_Home = function Home() {
	return Object(preact_min["h"])(
		'div',
		{ 'class': home_style_default.a.home },
		Object(preact_min["h"])(
			'div',
			{ 'class': home_style_default.a.firstSection },
			Object(preact_min["h"])(
				'div',
				{ 'class': home_style_default.a.titleArea },
				home__ref
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': home_style_default.a.subtitleArea },
				home__ref2
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': home_style_default.a.social },
				home__ref3
			)
		),
		Object(preact_min["h"])(
			'div',
			{ id: 'about', 'class': home_style_default.a.secondSection },
			Object(preact_min["h"])(
				'div',
				{ 'class': home_style_default.a.photoArea },
				Object(preact_min["h"])('div', { 'class': home_style_default.a.logo })
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': home_style_default.a.summaryArea },
				Object(preact_min["h"])(
					'p',
					{ 'class': home_style_default.a.sectionHeader },
					'The best time to plant a tree was 25 years ago. The second best time is now.'
				),
				home__ref4,
				home__ref5,
				_ref6,
				_ref7,
				_ref8
			),
			Object(preact_min["h"])('div', { 'class': home_style_default.a.blankArea })
		)
	);
};

/* harmony default export */ var home = (home_Home);
// EXTERNAL MODULE: ./routes/profile/style.css
var profile_style = __webpack_require__("Tv6c");
var profile_style_default = /*#__PURE__*/__webpack_require__.n(profile_style);

// CONCATENATED MODULE: ./routes/profile/index.js





var profile__ref = Object(preact_min["h"])(
	'h1',
	null,
	'Farmilo Strategy'
);

var profile__ref2 = Object(preact_min["h"])(
	'h2',
	null,
	'Solutions through persistence'
);

var profile__ref3 = Object(preact_min["h"])(
	'div',
	null,
	Object(preact_min["h"])(
		'a',
		{ href: 'https://twitter.com/billfarmilo' },
		Object(preact_min["h"])(social, { name: 'Twitter', foreground: '#1DA1F2', background: '#FFFFFF' })
	),
	Object(preact_min["h"])(
		'a',
		{ href: 'https://ca.linkedin.com/in/bill-farmilo-324b081' },
		Object(preact_min["h"])(social, { name: 'LinkedIn', foreground: '#FFFFFF', background: '#0077b5' })
	),
	Object(preact_min["h"])(
		'a',
		{ href: 'https://github.com/bfarmilo' },
		Object(preact_min["h"])(social, { name: 'GitHub', foreground: '#FFFFFF', background: '#1B1817' })
	)
);

var profile__ref4 = Object(preact_min["h"])(
	'p',
	null,
	'In nearly 25 years of work as, variously, an Intellectual Property Consultant and a Senior Executive in a medium-sized multinational consulting firm, I\'ve developed analysis experience in the following software fields:'
);

var profile__ref5 = Object(preact_min["h"])(
	'ul',
	null,
	Object(preact_min["h"])(
		'li',
		null,
		'Digital Video \u2013 MPEG2, ATSC, MPEG4, Digital Rights Management'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Hardware \u2013 Software updates, system memory, network interface, USB communications'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Mobile Operating Systems \u2013 iOS, Android, including OS updates and internals'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Streaming \u2013 DASH, HLS, BMFF, fMP4, MPEG-TS, WebM, content delivery, Encrypted Media Extensions, Media Source Extensions'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Internet \u2013 IPv4/6, TCP/IP, TLS/SSL, Content Delivery Networks'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'App Development \u2013 Front-end Technologies (React, JQuery, HTML5), Back-end Technologies (NodeJS/Express, PHP, also web server deployment including nGINX, Apache), Database Engines (SQLite, SQL Server, Redis, MongoDB), Cloud Services (MS Azure, AWS).'
	)
);

var profile__ref6 = Object(preact_min["h"])(
	'p',
	null,
	'Further back my focus was on hardware, including the following technology fields:'
);

var profile__ref7 = Object(preact_min["h"])(
	'ul',
	null,
	Object(preact_min["h"])(
		'li',
		null,
		'Semiconductor manufacturing and process'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Semiconductor packaging'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Semiconductor circuits \u2013 memory (DRAM, SRAM, Flash, EEPROM), phase lock loops, FPGAs, microcontrollers, A/D and D/A converters, image sensors'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Systems \u2013 mobile phones, personal computers, televisions, digital cameras'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Communications \u2013 Wi-Fi (802.11), Ethernet (802.3)'
	)
);

var profile__ref8 = Object(preact_min["h"])(
	'p',
	null,
	'I\'ve also been directly involved in licensing programs including the following:'
);

var _ref9 = Object(preact_min["h"])(
	'ul',
	null,
	Object(preact_min["h"])(
		'li',
		null,
		'Digital TV, Computers, Streaming, E-Commerce and Automotive programs for a company with extensive and novel IP in the fields of computer networking, encryption and digital media'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Semiconductor (memory) licensing program for a company holding foundational IP for semiconductor memory technology'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Digital camera licensing program for a well-known camera brand'
	)
);

var _ref10 = Object(preact_min["h"])(
	'p',
	null,
	'My management experience spanned over 15 years as a Senior leader, responsible for a team of 150 software and hardware engineers developing custom reverse engineering software, performing chip-level analysis and system-level analysis. During that time we added, through acquisition, teams in Warsaw Poland, Shanghai China, and Austin Texas. I was responsible for integrating these newly acquired companies to build a coherent, productive team.'
);

var profile_Profile = function Profile() {
	return Object(preact_min["h"])(
		'div',
		{ 'class': profile_style_default.a.home },
		Object(preact_min["h"])(
			'div',
			{ 'class': profile_style_default.a.firstSection },
			Object(preact_min["h"])(
				'div',
				{ 'class': profile_style_default.a.titleArea },
				profile__ref
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': profile_style_default.a.subtitleArea },
				profile__ref2
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': profile_style_default.a.social },
				profile__ref3
			)
		),
		Object(preact_min["h"])(
			'div',
			{ id: 'about', 'class': profile_style_default.a.secondSection },
			Object(preact_min["h"])(
				'div',
				{ 'class': profile_style_default.a.photoArea },
				Object(preact_min["h"])('div', { 'class': profile_style_default.a.logo })
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': profile_style_default.a.summaryArea },
				Object(preact_min["h"])(
					'p',
					{ 'class': profile_style_default.a.sectionHeader },
					'Experience and Expertise'
				),
				profile__ref4,
				profile__ref5,
				profile__ref6,
				profile__ref7,
				profile__ref8,
				_ref9,
				_ref10
			),
			Object(preact_min["h"])('div', { 'class': profile_style_default.a.blankArea })
		)
	);
};

/* harmony default export */ var profile = (profile_Profile);
// EXTERNAL MODULE: ./routes/ip/style.css
var ip_style = __webpack_require__("FitW");
var ip_style_default = /*#__PURE__*/__webpack_require__.n(ip_style);

// CONCATENATED MODULE: ./routes/ip/index.js






var ip__ref = Object(preact_min["h"])(
	'h1',
	null,
	'Farmilo Strategy'
);

var ip__ref2 = Object(preact_min["h"])(
	'h2',
	null,
	'Solutions through persistence'
);

var ip__ref3 = Object(preact_min["h"])(
	'div',
	null,
	Object(preact_min["h"])(
		'a',
		{ href: 'https://twitter.com/billfarmilo' },
		Object(preact_min["h"])(social, { name: 'Twitter', foreground: '#1DA1F2', background: '#FFFFFF' })
	),
	Object(preact_min["h"])(
		'a',
		{ href: 'https://ca.linkedin.com/in/bill-farmilo-324b081' },
		Object(preact_min["h"])(social, { name: 'LinkedIn', foreground: '#FFFFFF', background: '#0077b5' })
	),
	Object(preact_min["h"])(
		'a',
		{ href: 'https://github.com/bfarmilo' },
		Object(preact_min["h"])(social, { name: 'GitHub', foreground: '#FFFFFF', background: '#1B1817' })
	)
);

var ip__ref4 = Object(preact_min["h"])(
	'p',
	null,
	'We\'ve been working in the field of ',
	Object(preact_min["h"])(
		'strong',
		null,
		'Intellectual Property consulting'
	),
	' and ',
	Object(preact_min["h"])(
		'strong',
		null,
		'patent licensing'
	),
	' since 1997. Our licensing activities have included identification of potential licensees, selection of claims and exemplary products for analysis, infringement and market analysis, license valuation, and license negotiations.'
);

var ip__ref5 = Object(preact_min["h"])(
	'p',
	null,
	'With a background in systems, hardware and ',
	Object(preact_min["h"])(
		'strong',
		null,
		'software'
	),
	', we\'ve implemented practical systems and tools to analyze technologies of interest and facilitate the production and management of licensing packages, at one time including 50 concurrent license negotiations across 5 technology domains.'
);

var ip__ref6 = Object(preact_min["h"])(
	'p',
	null,
	'For example, here\'s a technical tool to analyze ',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://www.farmilostrategy.com/isoinspector/' },
		'MPEG4 and MPEG-TS Streaming Media ',
		Object(preact_min["h"])(social, { name: 'OutLink', foreground: '#353f12', background: '#00000000' })
	),
	' tags and file structure.'
);

var ip__ref7 = Object(preact_min["h"])(
	'p',
	null,
	'In addition to licensing work, we provide technical support for litigation activities including identification of infringing products, infringement analysis, support for claim constructions, invalidity responses, and IPRs.'
);

var ip_IntellectualProperty = function IntellectualProperty() {
	return Object(preact_min["h"])(
		'div',
		{ 'class': ip_style_default.a.home },
		Object(preact_min["h"])(
			'div',
			{ 'class': ip_style_default.a.firstSection },
			Object(preact_min["h"])(
				'div',
				{ 'class': ip_style_default.a.titleArea },
				ip__ref
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': ip_style_default.a.subtitleArea },
				ip__ref2
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': ip_style_default.a.social },
				ip__ref3
			)
		),
		Object(preact_min["h"])(
			'div',
			{ id: 'about', 'class': ip_style_default.a.secondSection },
			Object(preact_min["h"])(
				'div',
				{ 'class': ip_style_default.a.photoArea },
				Object(preact_min["h"])('div', { 'class': ip_style_default.a.logo })
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': ip_style_default.a.summaryArea },
				Object(preact_min["h"])(
					'p',
					{ 'class': ip_style_default.a.sectionHeader },
					'Intellectual Property Consulting Services'
				),
				ip__ref4,
				ip__ref5,
				ip__ref6,
				ip__ref7,
				Object(preact_min["h"])(
					'p',
					null,
					'Have a look at our ',
					Object(preact_min["h"])(
						match["Link"],
						{ activeClassName: ip_style_default.a.active, href: '/profile/' },
						'profile'
					),
					' to see some of the technical areas we\'ve been involved in.'
				)
			),
			Object(preact_min["h"])('div', { 'class': ip_style_default.a.blankArea })
		)
	);
};

/* harmony default export */ var ip = (ip_IntellectualProperty);
// EXTERNAL MODULE: ./routes/management/style.css
var management_style = __webpack_require__("MC2p");
var management_style_default = /*#__PURE__*/__webpack_require__.n(management_style);

// CONCATENATED MODULE: ./routes/management/index.js





var management__ref = Object(preact_min["h"])(
	'h1',
	null,
	'Farmilo Strategy'
);

var management__ref2 = Object(preact_min["h"])(
	'h2',
	null,
	'Solutions through persistence'
);

var management__ref3 = Object(preact_min["h"])(
	'div',
	null,
	Object(preact_min["h"])(
		'a',
		{ href: 'https://twitter.com/billfarmilo' },
		Object(preact_min["h"])(social, { name: 'Twitter', foreground: '#1DA1F2', background: '#FFFFFF' })
	),
	Object(preact_min["h"])(
		'a',
		{ href: 'https://ca.linkedin.com/in/bill-farmilo-324b081' },
		Object(preact_min["h"])(social, { name: 'LinkedIn', foreground: '#FFFFFF', background: '#0077b5' })
	),
	Object(preact_min["h"])(
		'a',
		{ href: 'https://github.com/bfarmilo' },
		Object(preact_min["h"])(social, { name: 'GitHub', foreground: '#FFFFFF', background: '#1B1817' })
	)
);

var management__ref4 = Object(preact_min["h"])(
	'p',
	null,
	'At Farmilo Strategy we know how to implement practical solutions to business problems.'
);

var management__ref5 = Object(preact_min["h"])(
	'p',
	null,
	'From ',
	Object(preact_min["h"])(
		'strong',
		null,
		'strategy development'
	),
	' to ',
	Object(preact_min["h"])(
		'strong',
		null,
		'culture-change'
	),
	' to ',
	Object(preact_min["h"])(
		'strong',
		null,
		'pre-'
	),
	' and ',
	Object(preact_min["h"])(
		'strong',
		null,
		'post-M&A integration'
	),
	' to ',
	Object(preact_min["h"])(
		'strong',
		null,
		'operations planning and process improvement'
	),
	', we have been where you are.'
);

var management__ref6 = Object(preact_min["h"])(
	'p',
	null,
	'We also recognize that every situation is unique, with its own challenges and opportunities. That\u2019s why we put a premium on listening and understanding. That\u2019s why we work with you and your team to develop a bespoke solution. Your goals become our goals.'
);

var management__ref7 = Object(preact_min["h"])(
	'p',
	null,
	'Let us help your small or medium sized business realize its potential.'
);

var management_Management = function Management() {
	return Object(preact_min["h"])(
		'div',
		{ 'class': management_style_default.a.home },
		Object(preact_min["h"])(
			'div',
			{ 'class': management_style_default.a.firstSection },
			Object(preact_min["h"])(
				'div',
				{ 'class': management_style_default.a.titleArea },
				management__ref
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': management_style_default.a.subtitleArea },
				management__ref2
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': management_style_default.a.social },
				management__ref3
			)
		),
		Object(preact_min["h"])(
			'div',
			{ id: 'about', 'class': management_style_default.a.secondSection },
			Object(preact_min["h"])(
				'div',
				{ 'class': management_style_default.a.photoArea },
				Object(preact_min["h"])('div', { 'class': management_style_default.a.logo })
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': management_style_default.a.summaryArea },
				Object(preact_min["h"])(
					'p',
					{ 'class': management_style_default.a.sectionHeader },
					'Management Consulting Services'
				),
				management__ref4,
				management__ref5,
				management__ref6,
				management__ref7
			),
			Object(preact_min["h"])('div', { 'class': management_style_default.a.blankArea })
		)
	);
};

/* harmony default export */ var management = (management_Management);
// CONCATENATED MODULE: ./components/app.js


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

var app__ref = Object(preact_min["h"])(header, null);

var app__ref2 = Object(preact_min["h"])(home, { path: '/' });

var app__ref3 = Object(preact_min["h"])(profile, { path: '/profile/' });

var app__ref4 = Object(preact_min["h"])(ip, { path: '/ip/' });

var app__ref5 = Object(preact_min["h"])(management, { path: '/management/' });

var app_App = function (_Component) {
	_inherits(App, _Component);

	function App() {
		var _temp, _this, _ret;

		_classCallCheck(this, App);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleRoute = function (e) {
			_this.currentUrl = e.url;
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	/** Gets fired when the route changes.
  *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
  *	@param {string} event.url	The newly routed URL
  */


	App.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ id: 'app' },
			app__ref,
			Object(preact_min["h"])(
				preact_router_es["Router"],
				{ onChange: this.handleRoute },
				app__ref2,
				app__ref3,
				app__ref4,
				app__ref5
			)
		);
	};

	return App;
}(preact_min["Component"]);

/*
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
*/



// CONCATENATED MODULE: ./index.js



/* harmony default export */ var index = __webpack_exports__["default"] = (app_App);

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e(e, t) {
    var n,
        o,
        r,
        i,
        l = W;for (i = arguments.length; i-- > 2;) {
      P.push(arguments[i]);
    }t && null != t.children && (P.length || P.push(t.children), delete t.children);while (P.length) {
      if ((o = P.pop()) && void 0 !== o.pop) for (i = o.length; i--;) {
        P.push(o[i]);
      } else "boolean" == typeof o && (o = null), (r = "function" != typeof e) && (null == o ? o = "" : "number" == typeof o ? o += "" : "string" != typeof o && (r = !1)), r && n ? l[l.length - 1] += o : l === W ? l = [o] : l.push(o), n = r;
    }var a = new T();return a.nodeName = e, a.children = l, a.attributes = null == t ? void 0 : t, a.key = null == t ? void 0 : t.key, void 0 !== M.vnode && M.vnode(a), a;
  }function t(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function n(e, t) {
    e && ("function" == typeof e ? e(t) : e.current = t);
  }function o(n, o) {
    return e(n.nodeName, t(t({}, n.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : n.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == V.push(e) && (M.debounceRendering || D)(i);
  }function i() {
    var e;while (e = V.pop()) {
      e.__d && x(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var n = t({}, e.attributes);n.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === n[r] && (n[r] = o[r]);
    }return n;
  }function c(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function s(e, t, o, r, i) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n(o, null), n(r, e);else if ("class" !== t || i) {
      if ("style" === t) {
        if (r && "string" != typeof r && "string" != typeof o || (e.style.cssText = r || ""), r && "object" == typeof r) {
          if ("string" != typeof o) for (var l in o) {
            l in r || (e.style[l] = "");
          }for (var l in r) {
            e.style[l] = "number" == typeof r[l] && !1 === E.test(l) ? r[l] + "px" : r[l];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) r && (e.innerHTML = r.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var a = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), r ? o || e.addEventListener(t, _, a) : e.removeEventListener(t, _, a), (e.__l || (e.__l = {}))[t] = r;
      } else if ("list" !== t && "type" !== t && !i && t in e) {
        try {
          e[t] = null == r ? "" : r;
        } catch (e) {}null != r && !1 !== r || "spellcheck" == t || e.removeAttribute(t);
      } else {
        var u = i && t !== (t = t.replace(/^xlink:?/, ""));null == r || !1 === r ? u ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof r && (u ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), r) : e.setAttribute(t, r));
      }
    } else e.className = r || "";
  }function _(e) {
    return this.__l[e.type](M.event && M.event(e) || e);
  }function f() {
    var e;while (e = A.shift()) {
      M.afterMount && M.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function d(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, B = null != e && !("__preactattr_" in e));var l = h(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (B = !1, i || f()), l;
  }function h(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return N(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = c(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0);
    }var p = i.firstChild,
        s = i.__preactattr_,
        _ = t.children;if (null == s) {
      s = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        s[f[d].name] = f[d].value;
      }
    }return !B && _ && 1 === _.length && "string" == typeof _[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != _[0] && (p.nodeValue = _[0]) : (_ && _.length || null != p) && m(i, _, n, o, B || null != s.dangerouslySetInnerHTML), y(i, t.attributes, s), R = l, i;
  }function m(e, t, n, o, r) {
    var i,
        a,
        u,
        c,
        s,
        _ = e.childNodes,
        f = [],
        d = {},
        m = 0,
        b = 0,
        y = _.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = _[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (m++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      c = t[C], s = null;var k = c.key;if (null != k) m && void 0 !== d[k] && (s = d[k], d[k] = void 0, m--);else if (b < g) for (i = b; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], c, r)) {
          s = a, f[i] = void 0, i === g - 1 && g--, i === b && b++;break;
        }
      }s = h(s, c, n, o), u = _[C], s && s !== e && s !== u && (null == u ? e.appendChild(s) : s === u.nextSibling ? p(u) : e.insertBefore(s, u));
    }if (m) for (var C in d) {
      void 0 !== d[C] && v(d[C], !1);
    }while (b <= g) {
      void 0 !== (s = f[g--]) && v(s, !1);
    }
  }function v(e, t) {
    var o = e._component;o ? k(o) : (null != e.__preactattr_ && n(e.__preactattr_.ref, null), !1 !== t && null != e.__preactattr_ || p(e), b(e));
  }function b(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;v(e, !0), e = t;
    }
  }function y(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || s(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || s(e, o, n[o], n[o] = t[o], R);
    }
  }function g(e, t, n) {
    var o,
        r = F.length;e.prototype && e.prototype.render ? (o = new e(t, n), U.call(o, t, n)) : (o = new U(t, n), o.constructor = e, o.render = w);while (r--) {
      if (F[r].constructor === e) return o.__b = F[r].__b, F.splice(r, 1), o;
    }return o;
  }function w(e, t, n) {
    return this.constructor(e, n);
  }function C(e, t, o, i, l) {
    e.__x || (e.__x = !0, e.__r = t.ref, e.__k = t.key, delete t.ref, delete t.key, void 0 === e.constructor.getDerivedStateFromProps && (!e.base || l ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, i)), i && i !== e.context && (e.__c || (e.__c = e.context), e.context = i), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== o && (1 !== o && !1 === M.syncComponentUpdates && e.base ? r(e) : x(e, 1, l)), n(e.__r, e));
  }function x(e, n, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          c = e.props,
          p = e.state,
          s = e.context,
          _ = e.__p || c,
          h = e.__s || p,
          m = e.__c || s,
          b = e.base,
          y = e.__b,
          w = b || y,
          N = e._component,
          U = !1,
          S = m;if (e.constructor.getDerivedStateFromProps && (p = t(t({}, p), e.constructor.getDerivedStateFromProps(c, p)), e.state = p), b && (e.props = _, e.state = h, e.context = m, 2 !== n && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(c, p, s) ? U = !0 : e.componentWillUpdate && e.componentWillUpdate(c, p, s), e.props = c, e.state = p, e.context = s), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !U) {
        i = e.render(c, p, s), e.getChildContext && (s = t(t({}, s), e.getChildContext())), b && e.getSnapshotBeforeUpdate && (S = e.getSnapshotBeforeUpdate(_, h));var L,
            T,
            P = i && i.nodeName;if ("function" == typeof P) {
          var W = u(i);l = N, l && l.constructor === P && W.key == l.__k ? C(l, W, 1, s, !1) : (L = l, e._component = l = g(P, W, s), l.__b = l.__b || y, l.__u = e, C(l, W, 0, s, !1), x(l, 1, o, !0)), T = l.base;
        } else a = w, L = N, L && (a = e._component = null), (w || 1 === n) && (a && (a._component = null), T = d(a, i, s, o || !b, w && w.parentNode, !0));if (w && T !== w && l !== N) {
          var D = w.parentNode;D && T !== D && (D.replaceChild(T, w), L || (w._component = null, v(w, !1)));
        }if (L && k(L), e.base = T, T && !r) {
          var E = e,
              V = e;while (V = V.__u) {
            (E = V).base = T;
          }T._component = E, T._componentConstructor = E.constructor;
        }
      }!b || o ? A.push(e) : U || (e.componentDidUpdate && e.componentDidUpdate(_, h, S), M.afterUpdate && M.afterUpdate(e));while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || f();
    }
  }function N(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        c = a,
        p = u(t);while (r && !c && (r = r.__u)) {
      c = r.constructor === t.nodeName;
    }return r && c && (!o || r._component) ? (C(r, p, 3, n, o), e = r.base) : (i && !a && (k(i), e = l = null), r = g(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), C(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, v(l, !1))), e;
  }function k(e) {
    M.beforeUnmount && M.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var o = e._component;o ? k(o) : t && (null != t.__preactattr_ && n(t.__preactattr_.ref, null), e.__b = t, p(t), F.push(e), b(t)), n(e.__r, null);
  }function U(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {}, this.__h = [];
  }function S(e, t, n) {
    return d(n, e, {}, !1, t, !1);
  }function L() {
    return {};
  }var T = function T() {},
      M = {},
      P = [],
      W = [],
      D = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      E = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      V = [],
      A = [],
      H = 0,
      R = !1,
      B = !1,
      F = [];t(U.prototype, { setState: function setState(e, n) {
      this.__s || (this.__s = this.state), this.state = t(t({}, this.state), "function" == typeof e ? e(this.state, this.props) : e), n && this.__h.push(n), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && this.__h.push(e), x(this, 2);
    }, render: function render() {} });var j = { h: e, createElement: e, cloneElement: o, createRef: L, Component: U, render: S, rerender: i, options: M }; true ? module.exports = j : self.preact = j;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "MC2p":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__2THaV","titleArea":"titleArea__3QLJ1","subtitleArea":"subtitleArea__NVCAc","social":"social__3eeSt","firstSection":"firstSection__3JUUk","secondSection":"secondSection__1XzkS","logo":"logo__3PHNd","photoArea":"photoArea__2xkkq","summaryArea":"summaryArea__2feOm","blankArea":"blankArea__1rDr5","sectionHeader":"sectionHeader__3K4ys"};

/***/ }),

/***/ "Tv6c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__1PXCs","titleArea":"titleArea__3WxNU","subtitleArea":"subtitleArea__23fSB","social":"social__34HfM","firstSection":"firstSection__2BS-r","secondSection":"secondSection__3Yu-T","logo":"logo__25C7w","photoArea":"photoArea__1ptER","summaryArea":"summaryArea__3hgLQ","blankArea":"blankArea__3rmww","sectionHeader":"sectionHeader__3KS-t"};

/***/ }),

/***/ "ZAL5":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__2Q5nZ","titleArea":"titleArea__6lekv","subtitleArea":"subtitleArea__6oUZa","social":"social__20X69","firstSection":"firstSection__2pUC4","secondSection":"secondSection__2BiB7","logo":"logo__3ZBKB","photoArea":"photoArea__JhwpO","summaryArea":"summaryArea__kiB7X","blankArea":"blankArea__S_WeD","sectionHeader":"sectionHeader__15YrC"};

/***/ }),

/***/ "rq4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "sw5u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Link = exports.Match = undefined;

var _extends = Object.assign || function (target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}return target;
};

var _preact = __webpack_require__("KM04");

var _preactRouter = __webpack_require__("/QC5");

function _objectWithoutProperties(obj, keys) {
	var target = {};for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	}return target;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Match = exports.Match = function (_Component) {
	_inherits(Match, _Component);

	function Match() {
		var _temp, _this, _ret;

		_classCallCheck(this, Match);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.update = function (url) {
			_this.nextUrl = url;
			_this.setState({});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Match.prototype.componentDidMount = function componentDidMount() {
		_preactRouter.subscribers.push(this.update);
	};

	Match.prototype.componentWillUnmount = function componentWillUnmount() {
		_preactRouter.subscribers.splice(_preactRouter.subscribers.indexOf(this.update) >>> 0, 1);
	};

	Match.prototype.render = function render(props) {
		var url = this.nextUrl || (0, _preactRouter.getCurrentUrl)(),
		    path = url.replace(/\?.+$/, '');
		this.nextUrl = null;
		return props.children[0] && props.children[0]({
			url: url,
			path: path,
			matches: path === props.path
		});
	};

	return Match;
}(_preact.Component);

var Link = function Link(_ref) {
	var activeClassName = _ref.activeClassName,
	    path = _ref.path,
	    props = _objectWithoutProperties(_ref, ['activeClassName', 'path']);

	return (0, _preact.h)(Match, { path: path || props.href }, function (_ref2) {
		var matches = _ref2.matches;
		return (0, _preact.h)(_preactRouter.Link, _extends({}, props, { 'class': [props.class || props.className, matches && activeClassName].filter(Boolean).join(' ') }));
	});
};

exports.Link = Link;
exports.default = Match;

Match.Link = Link;

/***/ }),

/***/ "u3et":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"header":"header__2MqSo","active":"active__27Q54"};

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map