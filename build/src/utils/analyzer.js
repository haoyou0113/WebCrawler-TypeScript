"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var Analyizer = /** @class */ (function () {
    function Analyizer() {
    }
    Analyizer.getInstance = function () {
        if (!Analyizer.instance) {
            Analyizer.instance = new Analyizer();
        }
        return Analyizer.instance;
    };
    Analyizer.prototype.getInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var courseItems = $('.course-item');
        var courseInfo = [];
        courseItems.map(function (index, element) {
            var descs = $(element).find('.course-desc');
            var title = descs.eq(0).text();
            var count = Number(descs.eq(1).text().split('：')[1]);
            courseInfo.push({
                title: title, count: count
            });
        });
        return {
            time: new Date().getTime(),
            data: courseInfo
        };
    };
    Analyizer.prototype.generateJsonContent = function (courseInfo, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[courseInfo.time] = courseInfo.data;
        // console.log(fileContent)
        return fileContent;
    };
    Analyizer.prototype.analyze = function (html, filePath) {
        var courseResult = this.getInfo(html);
        var fileContent = this.generateJsonContent(courseResult, filePath);
        return JSON.stringify(fileContent);
    };
    return Analyizer;
}());
exports.default = Analyizer;
