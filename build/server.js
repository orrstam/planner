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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/server.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.ts":
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst express = __webpack_require__(/*! express */ \"express\");\nconst dotenv = __webpack_require__(/*! dotenv */ \"dotenv\");\nconst cors = __webpack_require__(/*! cors */ \"cors\");\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst routes_1 = __webpack_require__(/*! ./server/routes/routes */ \"./server/routes/routes.ts\");\nclass App {\n    constructor() {\n        this.app = express();\n        this.app.use(cors({ origin: 'http://localhost:3000' }));\n        this.config();\n        this.routes();\n    }\n    config() {\n        this.app.use(bodyParser.json());\n        this.app.use(bodyParser.urlencoded({ extended: true }));\n        dotenv.config({ path: '.env' });\n    }\n    routes() {\n        this.app.use('/', routes_1.default.router);\n    }\n}\nexports.default = new App().app;\n\n\n//# sourceURL=webpack:///./app.ts?");

/***/ }),

/***/ "./server/Models/Task.ts":
/*!*******************************!*\
  !*** ./server/Models/Task.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst taskSchema = new mongoose_1.Schema({\n    title: {\n        type: String,\n        required: true\n    },\n    text: String,\n    created: {\n        type: Date,\n        default: Date.now\n    },\n});\nexports.default = mongoose_1.model('Task', taskSchema);\n\n\n//# sourceURL=webpack:///./server/Models/Task.ts?");

/***/ }),

/***/ "./server/controllers/HomeController.ts":
/*!**********************************************!*\
  !*** ./server/controllers/HomeController.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Task_1 = __webpack_require__(/*! ../Models/Task */ \"./server/Models/Task.ts\");\nclass HomeController {\n    get(req, res, next) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const tasks = yield Task_1.default.find();\n            res.send(tasks);\n        });\n    }\n    create(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const task = yield (new Task_1.default(req.body)).save();\n            res.send(task);\n        });\n    }\n}\nexports.default = new HomeController;\n\n\n//# sourceURL=webpack:///./server/controllers/HomeController.ts?");

/***/ }),

/***/ "./server/routes/routes.ts":
/*!*********************************!*\
  !*** ./server/routes/routes.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst express = __webpack_require__(/*! express */ \"express\");\nconst HomeController_1 = __webpack_require__(/*! ../controllers/HomeController */ \"./server/controllers/HomeController.ts\");\nclass Routes {\n    constructor() {\n        this.router = express.Router();\n        this.setupRoutes();\n    }\n    setupRoutes() {\n        this.router.get('/api/v1', HomeController_1.default.get);\n        this.router.post('/api/v1', HomeController_1.default.create);\n    }\n}\nexports.default = new Routes;\n\n\n//# sourceURL=webpack:///./server/routes/routes.ts?");

/***/ }),

/***/ "./server/server.ts":
/*!**************************!*\
  !*** ./server/server.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst app_1 = __webpack_require__(/*! ../app */ \"./app.ts\");\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n__webpack_require__(/*! dotenv */ \"dotenv\").config({ path: './.env' });\nmongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });\nmongoose.connection.on('error', (err) => {\n    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);\n});\napp_1.default.set('port', process.env.PORT || 7778);\nconst server = app_1.default.listen(app_1.default.get('port'), () => {\n    console.log(`Express running → PORT ${app_1.default.get('port')} in ${app_1.default.get('env')} mode`);\n});\n\n\n//# sourceURL=webpack:///./server/server.ts?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ })

/******/ });