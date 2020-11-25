"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../utils/util");
var express_1 = require("express");
var crowller_1 = __importDefault(require("../utils/crowller"));
var analyzer_1 = __importDefault(require("../utils/analyzer"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var checkLogin = function (req, res, next) {
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        next();
    }
    else {
        res.json(util_1.getResponseData(null, "Please Login123"));
    }
};
var router = express_1.Router();
router.get('/', function (req, res) {
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.send("\n        <html>\n        <body>\n        <a href='/getData'>Get </a>\n        <br/>\n        <a href='/showData'>Show </a>\n        <br/>\n        <a href='/logout'>Log out </a>\n        </body >\n        </html>\n        ");
    }
    else {
        res.send("\n        <html>\n        <body>\n        <form method ='post' action = \"/login\" >\n        <input type = \"password\" name=\"password\" />\n        <button>Login </button>\n        </form>\n        </body >\n        </html>\n        ");
    }
});
router.post('/login', function (req, res) {
    var password = req.body.password;
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.json(util_1.getResponseData(false, 'already login'));
    }
    else {
        if (password === '123' && req.session) {
            req.session.login = true;
            res.json(util_1.getResponseData(true));
        }
        else {
            res.json(util_1.getResponseData(false, 'login failed'));
        }
    }
});
router.get('/logout', function (req, res) {
    if (req.session) {
        req.session.login = false;
    }
    res.json(util_1.getResponseData(true));
});
router.get('/getData', checkLogin, function (req, res) {
    var secret = 'x3b174jsx';
    var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + secret; // set
    var analyzer = analyzer_1.default.getInstance();
    new crowller_1.default(url, analyzer);
    res.json(util_1.getResponseData(true));
});
router.get('/showData', checkLogin, function (req, res) {
    try {
        var position = path_1.default.resolve(__dirname, '../data/result.json');
        var result = fs_1.default.readFileSync(position, 'utf-8');
        res.json(util_1.getResponseData((JSON.parse(result))));
    }
    catch (_a) {
        res.json(util_1.getResponseData(false, 'no result'));
    }
});
exports.default = router;
