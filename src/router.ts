import { Router, Request, Response } from 'express'
import Crawler from './crowller'
import Analyzer from './analyzer'


interface RequestWithBody extends Request {
    body: {
        [key: string]: string | undefined
    }

}
const router = Router()


router.get('/', (req: Request, res: Response) => {
    res.send(`
        <html>
        <body>
        <form method ='post' action = "/getData" >
        <input type = "password" name="password" />
        <button>Submit </button>
        </form>
        </body >
        </html>
        `)
})
// router.get('/login', (req: Request, res: Response) => {

// })
router.post('/getData', (req: RequestWithBody, res: Response) => {
    console.log(req)
    const { password } = req.body;
    if (password === '123') {
        const secret = 'x3b174jsx'
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}` // set
        const analyzer = Analyzer.getInstance()
        new Crawler(url, analyzer)
        res.send('get success')
    } else {
        res.send('password error')
    }

})

export default router