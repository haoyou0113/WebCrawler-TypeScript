import superagent from 'superagent'
import fs from 'fs'
import path from 'path'
import Analyzer from './analyzer'
import DiyAnalyzer from './DiyAnalyzer'

export interface AnalyzerType {
    analyze: (html: string, filePath: string) => string
}

class Crawler {

    private filePath = path.resolve(__dirname, '../data/result.json')

    async getRawHtml() {
        const result = await superagent.get(this.url)
        return result.text
    }
    writeFile(content: string) {
        fs.writeFileSync(this.filePath, content)
    }
    async initSpiderProcess() {
        const html = await this.getRawHtml();
        const fileContent = this.analyzer.analyze(html, this.filePath);
        this.writeFile(fileContent);
    }

    constructor(private url: string, private analyzer: AnalyzerType) {
        this.initSpiderProcess()
    }

}
const secret = 'x3b174jsx'
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}` // set
const analyzer = new DiyAnalyzer()
const crawler = new Crawler(url, analyzer)