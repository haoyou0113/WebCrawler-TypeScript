"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Login_1 = __importDefault(require("./components/Login/Login"));
var react_router_dom_1 = require("react-router-dom");
var Home_1 = __importDefault(require("./components/Home/Home"));
require("antd/dist/antd.css");
var App = function () {
    return (<div>
    <react_router_dom_1.HashRouter>
      <react_router_dom_1.Switch>
        <react_router_dom_1.Route path="/login" exact component={Login_1.default}></react_router_dom_1.Route>
        <react_router_dom_1.Route path="/" exact component={Home_1.default}></react_router_dom_1.Route>
      <Login_1.default />
      </react_router_dom_1.Switch>
    </react_router_dom_1.HashRouter>
    </div>);
};
exports.default = App;
