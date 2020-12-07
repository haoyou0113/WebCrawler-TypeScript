import { Request, Response, NextFunction } from 'express'
import 'reflect-metadata'

import { controller, use, get } from '../decorator'
import { getResponseData } from '../utils/util';
import Crawler from '../utils/crowller'
import Analyzer from '../utils/analyzer'

import fs from 'fs';
import path from 'path'


interface BodyRequest extends Request {
    body: {
        [key: string]: string | undefined
    }

}


const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
    const isLogin = !!(req.session ? req.session.login : false)
    console.log(1)
    if (isLogin) {
        next()
    } else {
        res.json(getResponseData(null, "Please Login"))

    }

}

const test = (req: Request, res: Response, next: NextFunction): void => {
    console.log(2)
    next()
}



@controller('/')
export class CrawlerController {
    @get('/getData') //path
    @use([checkLogin, test]) // use middleware
    // use middleware
    getData(req: BodyRequest, res: Response): void {
        const secret = 'x3b174jsx'
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}` // set
        const analyzer = Analyzer.getInstance()
        new Crawler(url, analyzer)
        res.json(getResponseData(true))
    }


    @get('/showData') //path
    @use(checkLogin) // use middleware
    showData(req: BodyRequest, res: Response): void {
        try {
            const position = path.resolve(__dirname, '../../data/result.json')
            const result = fs.readFileSync(position, 'utf8')
            res.json(getResponseData((JSON.parse(result))))
        } catch {
            res.json(getResponseData(false, 'no result'))

        }
    }
}