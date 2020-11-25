"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var crowller_1 = __importDefault(require("./crowller"));
var analyzer_1 = __importDefault(require("./analyzer"));
var router = express_1.Router();
router.get('/', function (req, res) {
    res.send("\n        <html>\n        <body>\n        <form method ='post' action = \"/getData\" >\n        <input type = \"password\" name=\"password\" />\n        <button>Submit </button>\n        </form>\n        </body >\n        </html>\n        ");
});
// router.get('/login', (req: Request, res: Response) => {
// })
router.post('/getData', function (req, res) {
    console.log(req);
    var password = req.body.password;
    if (password === '123') {
        var secret = 'x3b174jsx';
        var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + secret; // set
        var analyzer = analyzer_1.default.getInstance();
        new crowller_1.default(url, analyzer);
        res.send('get success');
    }
    else {
        res.send('password error');
    }
});
exports.default = router;
