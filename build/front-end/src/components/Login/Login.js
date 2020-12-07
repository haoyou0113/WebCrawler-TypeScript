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
var axios_1 = __importDefault(require("axios"));
var react_router_dom_1 = require("react-router-dom");
var qs_1 = __importDefault(require("qs"));
var antd_1 = require("antd");
require("./style.css");
var Login = function (props) {
    var _a = react_1.useState({
        isLogin: false
    }), state = _a[0], setState = _a[1];
    var _b = react_1.useState(false), signIn = _b[0], setSighIn = _b[1];
    var _c = react_1.useState({
        user: '',
        password: Number
    }), userInfo = _c[0], serUserInfo = _c[1];
    var handleSignIn = function () {
        setSighIn(true);
    };
    var handleLogIn = function () {
        setSighIn(false);
    };
    var handleSubmit = function (event) {
        axios_1.default.post('/api/login', qs_1.default.stringify({
            password: userInfo.password
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function (res) {
            var _a;
            if ((_a = res.data) === null || _a === void 0 ? void 0 : _a.data) {
                setState({ isLogin: true });
            }
            else {
                antd_1.message.error('login failed');
            }
        });
        event.preventDefault();
    };
    var onUsernameChange = function (event) {
        serUserInfo(function (userInfo) { return __assign(__assign({}, userInfo), { user: event.target.value }); });
    };
    var onPasswordChange = function (event) {
        serUserInfo(function (userInfo) { return __assign(__assign({}, userInfo), { password: event.target.value }); });
    };
    return state.isLogin ? (<react_router_dom_1.Redirect to='/'/>) : (<div className={"container " + (signIn ? "sign-up-mode" : null)}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form" onSubmit={handleSubmit}>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" onChange={onUsernameChange}/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" onChange={onPasswordChange}/>
            </div>
            <input type="submit" value="Login" className="btn solid"/>
            <p className="social-text">Or Sign in with social platforms</p>
            
          </form>
          <form action="#" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username"/>
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email"/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password"/>
            </div>
            <input type="submit" className="btn" value="Sign up"/>
            <p className="social-text">Or Sign up with social platforms</p>
            
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
              </p>
            <button className={"transparent btn"} id="sign-up-btn" onClick={handleSignIn}>
              Sign up
              </button>
          </div>
          <img src="/public/img/log.svg" className="image" alt=""/>
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
              </p>
            <button className={"transparent btn"} id="sign-in-btn" onClick={handleLogIn}>
              Sign in
              </button>
          </div>
          <img src="/public/img/register.svg" className="image" alt=""/>
        </div>
      </div>
    </div>);
};
exports.default = Login;
