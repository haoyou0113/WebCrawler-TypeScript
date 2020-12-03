"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = exports.post = exports.get = exports.router = void 0;
var express_1 = require("express");
var Method;
(function (Method) {
    Method["get"] = "get";
    Method["post"] = "post";
})(Method || (Method = {}));
exports.router = express_1.Router();
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
}
exports.get = getRequestDecorator('get');
exports.post = getRequestDecorator('post');
// export function post(path: string) {
//     return function (target: any, key: string) {
//         Reflect.defineMetadata('path', path, target, key)
//         Reflect.defineMetadata('method', 'post', target, key)
//     }
// }
// export function get(path: string) {
//     return function (target: any, key: string) {
//         Reflect.defineMetadata('path', path, target, key)
//         Reflect.defineMetadata('method', 'get', target, key)
//     }
// }
function controller(target) {
    for (var key in target.prototype) {
        var path = Reflect.getMetadata('path', target.prototype, key);
        var method = Reflect.getMetadata('method', target.prototype, key);
        var handler = target.prototype[key];
        if (path && method && handler) {
            exports.router[method](path, handler);
            exports.router.get(path, handler);
        }
    }
}
exports.controller = controller;
