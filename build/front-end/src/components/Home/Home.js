"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var antd_1 = require("antd");
var react_router_dom_1 = require("react-router-dom");
var axios_1 = __importDefault(require("axios"));
require("./style.css");
var Home = function () {
    var _a = react_1.useState({
        loaded: false,
        isLogin: true
    }), state = _a[0], setState = _a[1];
    react_1.useEffect(function () {
        axios_1.default.get('/api/isLogin').then(function (res) {
            var _a;
            console.log(res);
            if (!((_a = res.data) === null || _a === void 0 ? void 0 : _a.data)) {
                setState(function (state) { return ({
                    loaded: true,
                    isLogin: false,
                }); });
            }
            else {
                setState(function (state) { return (__assign(__assign({}, state), { loaded: true })); });
            }
        });
    }, []);
    var handleLogout = function () {
        axios_1.default.get('/api/logout').then(function (res) {
            setState(function (state) { return (__assign(__assign({}, state), { isLogin: false })); });
        });
    };
    var handleGetData = function () {
    };
    return state.isLogin ? (state.loaded ?
        (<div className='home-page'>
            <antd_1.Button type='primary'>Get</antd_1.Button>
            <antd_1.Button type='primary'>Show</antd_1.Button>
            <antd_1.Button type='primary' onClick={handleLogout}>LogOut</antd_1.Button>
        </div>) : null) : (<react_router_dom_1.Redirect to='/login'/>);
};
exports.default = Home;
