(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Xplojs"] = factory();
	else
		root["Xplojs"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar main_1 = __webpack_require__(1);\nmodule.exports = main_1.default;\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/lib.ts\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/lib.ts?");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar rocket_1 = __webpack_require__(2);\nvar Xplojs = /** @class */ (function () {\n    function Xplojs(selector) {\n        this.selector = selector;\n        this.fps = 120;\n        this.lastLoop = Date.now();\n        this.lastTime = 0;\n        this.objects = [];\n        this.reset();\n        this.clear();\n    }\n    Xplojs.prototype.reset = function () {\n        if (this.selector instanceof HTMLElement) {\n            this.el = this.selector;\n        }\n        else {\n            this.el = document.querySelector(this.selector);\n        }\n        if (!this.el.parentElement) {\n            return;\n        }\n        this.el.width = this.el.parentElement.clientWidth * 2;\n        this.el.height = this.el.parentElement.clientHeight * 2;\n        this.width = this.el.width / 2;\n        this.height = this.el.height / 2;\n        this.el.style.width = this.width + 'px';\n        this.el.style.height = this.height + 'px';\n        this.fireworksDuration = parseInt(this.el.getAttribute('data-fireworks-duration') || '0');\n        this.ctx = this.el.getContext('2d');\n        this.ctx.scale(2, 2);\n        this.objects = [];\n    };\n    Xplojs.prototype.start = function () {\n        this.startTime = Date.now();\n        this.seed(4);\n        this.render();\n    };\n    Xplojs.prototype.stop = function () {\n        // Set to 1ms, this will make the animation end after all particles\n        // have disappeared.\n        this.fireworksDuration = 1;\n    };\n    Xplojs.prototype.render = function (t) {\n        var _this = this;\n        if (t === void 0) { t = 0; }\n        var now = Date.now();\n        if (!this.keepRunning() && this.objects.length == 0) {\n            this.clear();\n            return;\n        }\n        requestAnimationFrame(this.render.bind(this));\n        this.objects = this.objects.filter(function (o) {\n            return !o.dead;\n        });\n        if (this.keepRunning() && this.objects.filter(function (o) { return o instanceof rocket_1.Rocket; }).length < 1) {\n            this.seed();\n        }\n        if (!this.needsRedraw()) {\n            return;\n        }\n        if (now - this.lastLoop > (1 / this.fps) * 1000) {\n            this.lastLoop = now;\n            this.ctx.fillStyle = 'rgba(31, 127, 103, 0.14)';\n            this.ctx.fillRect(0, 0, this.width, this.height);\n            this.objects.forEach(function (o) {\n                o.integrate(t - _this.lastTime);\n                if (o instanceof rocket_1.Rocket) {\n                    var rocketParticles = o.explode();\n                    if (rocketParticles.length > 0) {\n                        (_a = _this.objects).push.apply(_a, rocketParticles);\n                    }\n                }\n                o.draw();\n                var _a;\n            });\n            this.lastTime = t;\n        }\n    };\n    Xplojs.prototype.seed = function (n) {\n        var count = n || Math.ceil((Math.random() * 10));\n        for (var i = 0; i < count; i++) {\n            this.objects.push(new rocket_1.Rocket(this.ctx, {\n                alpha: 1,\n                x: Math.random() * this.width,\n                y: this.height,\n                direction: (Math.random() * 60) - 180,\n                velocity: 0.25,\n                decay: 0,\n                gravity: Math.random() < 0.08 ? Math.random() * 4 : 0,\n                color: 0,\n            }));\n        }\n    };\n    Xplojs.prototype.keepRunning = function () {\n        var duration = Date.now() - this.startTime;\n        /**\n         * Stop when the duration has been reached.\n         */\n        if (this.fireworksDuration > 0 && duration > this.fireworksDuration) {\n            return false;\n        }\n        return true;\n    };\n    Xplojs.prototype.clear = function () {\n        this.ctx.fillStyle = '#1F7F67';\n        this.ctx.fillRect(0, 0, this.width, this.height);\n    };\n    Xplojs.prototype.needsRedraw = function () {\n        return this.objects.find(function (d) { return d.dirty; });\n    };\n    return Xplojs;\n}());\nexports.default = Xplojs;\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/main.ts\n// module id = 1\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = Object.setPrototypeOf ||\n        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar particle_1 = __webpack_require__(3);\nvar Rocket = /** @class */ (function (_super) {\n    __extends(Rocket, _super);\n    function Rocket(ctx, config) {\n        var _this = _super.call(this, ctx, config) || this;\n        _this.age = 0;\n        return _this;\n    }\n    Rocket.prototype.draw = function () {\n        var ctx = this.ctx;\n        var _a = this.config, x = _a.x, y = _a.y, direction = _a.direction, velocity = _a.velocity;\n        var angle = Math.PI * (direction + 135) / 180;\n        ctx.fillStyle = \"rgba(255, 255, 255, \" + this.config.alpha + \")\";\n        ctx.beginPath();\n        ctx.ellipse(x, y, 1, 10, angle, 0, Math.PI * 2);\n        ctx.fill();\n    };\n    Rocket.prototype.explode = function (force) {\n        if (force === void 0) { force = false; }\n        if (this.age < 5000) {\n            if (this.config.y > this.ctx.canvas.height / 3.5) {\n                return [];\n            }\n            if (Math.random() > 0.03) {\n                return [];\n            }\n        }\n        var particleCount = 100 + (Math.random() * 400);\n        var particles = [];\n        for (var i = 0; i < particleCount; i++) {\n            var newConfig = Object.assign({}, this.config);\n            newConfig.direction = (Math.random() * 360) - 180;\n            newConfig.velocity = newConfig.velocity * (Math.random() * 1.9);\n            newConfig.alpha = Math.random();\n            newConfig.decay = Math.max(Math.random() * 0.10, 0.008);\n            newConfig.gravity = Math.random() < 0.01 ? Math.random() * 10 : 0;\n            particles.push(new particle_1.Particle(this.ctx, newConfig));\n        }\n        this.destroy();\n        return particles;\n    };\n    Rocket.prototype.integrate = function (time) {\n        _super.prototype.integrate.call(this, time);\n        this.age += time;\n    };\n    Rocket.prototype.destroy = function () {\n        this.config.alpha = 0;\n    };\n    return Rocket;\n}(particle_1.Particle));\nexports.Rocket = Rocket;\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/rocket.ts\n// module id = 2\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/rocket.ts?");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Particle = /** @class */ (function () {\n    function Particle(ctx, config) {\n        this.ctx = ctx;\n        this.config = config;\n        this.age = 0;\n    }\n    Particle.prototype.draw = function () {\n        var ctx = this.ctx;\n        var _a = this.config, x = _a.x, y = _a.y, direction = _a.direction, velocity = _a.velocity;\n        var angle = Math.PI * direction / 180;\n        ctx.fillStyle = \"rgba(255, 255, 255, \" + this.config.alpha + \")\";\n        ctx.beginPath();\n        ctx.ellipse(x, y, 3, 3, 0, 0, Math.PI * 2);\n        ctx.fill();\n    };\n    Particle.prototype.integrate = function (time) {\n        var angle = Math.PI * this.config.direction / 180;\n        var velocity = this.config.velocity * time;\n        var x1 = velocity * Math.cos(angle) - velocity * Math.sin(angle);\n        var y1 = velocity * Math.sin(angle) + velocity * Math.cos(angle);\n        this.config.x += x1;\n        this.config.y += y1;\n        this.config.velocity *= 0.99;\n        this.config.alpha -= time * this.config.decay * 0.05;\n        if (Math.random() > 0.5) {\n            this.config.direction -= this.config.gravity;\n        }\n        else {\n            this.config.direction += this.config.gravity;\n        }\n    };\n    Object.defineProperty(Particle.prototype, \"dirty\", {\n        get: function () {\n            return true;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(Particle.prototype, \"dead\", {\n        get: function () {\n            return this.config.alpha <= 0;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    return Particle;\n}());\nexports.Particle = Particle;\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/particle.ts\n// module id = 3\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/particle.ts?");

/***/ })
/******/ ]);
});