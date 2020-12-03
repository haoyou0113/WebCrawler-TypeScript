"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = exports.get = exports.router = void 0;
var express_1 = require("express");
exports.router = express_1.Router();
function get(path) {
    return function (target, key) {
        Reflect.defineMetadata('path', path, target, key);
    };
}
exports.get = get;
function controller(target) {
    for (var key in target.prototype) {
        var path = Reflect.getMetadata('path', target.prototype, key);
        var handler = target.prototype[key];
        if (path) {
            exports.router.get(path, handler);
        }
    }
}
exports.controller = controller;
