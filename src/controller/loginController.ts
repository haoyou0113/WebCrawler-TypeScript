
import { Request, Response, } from 'express'
import 'reflect-metadata'
import { controller, get, post } from '../decorator'
import { getResponseData } from '../utils/util';



interface BodyRequest extends Request {
    body: {
        [key: string]: string | undefined
    }

}

@controller('/')
export class LoginController {

    static isLogin(req: BodyRequest) {
        return !!(req.session ? req.session.login : false)

    }

    @get('/api/isLogin')
    isLogin(req: BodyRequest, res: Response): void {
        const isLogin = LoginController.isLogin(req);
        res.json(getResponseData(isLogin))
    }
    @post('/api/login')
    login(req: BodyRequest, res: Response): void {
        const { password } = req.body;
        const isLogin = LoginController.isLogin(req)
        if (isLogin) {
            res.json(getResponseData(true))

        } else {
            if (password === '123' && req.session) {
                req.session.login = true;
                res.json(getResponseData(true))

            }
            else {
                res.json(getResponseData(false, 'login failed'))

            }
        }
    }
    @get('/api/logout')
    logout(req: BodyRequest, res: Response): void {
        if (req.session) {
            req.session.login = false
        }
        res.json(getResponseData(true))
    }
    @get('/')
    home(req: BodyRequest, res: Response): void {
        const isLogin = LoginController.isLogin(req)
        if (isLogin) {
            res.send(`
        <html>
        <body>
        <a href='/getData'>Get </a>
        <br/>
        <a href='/showData'>Show </a>
        <br/>
        <a href='/api/logout'>Log out </a>
        </body >
        </html>
        `)
        } else {
            res.send(`
        <html>
        <body>
        <form method ='post' action = "/login" >
        <input type = "password" name="password" />
        <button>Login </button>
        </form>
        </body >
        </html>
        `)
        }

    }
}