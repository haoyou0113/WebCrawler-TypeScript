import cheerio from 'cheerio'

import fs from 'fs'
import { AnalyzerType } from './crowller'
interface Format {
    title: string, count: number
}

interface Result {
    time: number,
    data: Format[];
}
interface Content {
    [propName: number]: Format[]
}
export default class Analyizer implements AnalyzerType {
    private static instance: Analyizer

    static getInstance() {
        if (!Analyizer.instance) {
            Analyizer.instance = new Analyizer()
        }
        return Analyizer.instance
    }
    private getInfo(html: string) {
        const $ = cheerio.load(html)
        const courseItems = $('.course-item');
        const courseInfo: Format[] = []
        courseItems.map((index, element) => {
            const descs = $(element).find('.course-desc');
            const title = descs.eq(0).text();
            const count = Number(descs.eq(1).text().split('：')[1])
            courseInfo.push({
                title, count
            })
        })
        return {
            time: new Date().getTime(),
            data: courseInfo
        }

    }

    private generateJsonContent(courseInfo: Result, filePath: string) {

        let fileContent: Content = {}
        if (fs.existsSync(filePath)) {
            fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        }
        fileContent[courseInfo.time] = courseInfo.data;
        console.log(fileContent)
        return fileContent

    }

    public analyze(html: string, filePath: string) {

        const courseResult = this.getInfo(html)
        const fileContent = this.generateJsonContent(courseResult, filePath)

        return JSON.stringify(fileContent)

    }
    private constructor() {

    }
}