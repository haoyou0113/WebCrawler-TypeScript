
import { Request, Response, } from 'express'
import 'reflect-metadata'
import { get, controller, post } from './decorator'
import { getResponseData } from '../utils/util';



interface BodyRequest extends Request {
    body: {
        [key: string]: string | undefined
    }

}

@controller
class LoginController {
    @post('/login')
    login(req: BodyRequest, res: Response) {
        const { password } = req.body;
        const isLogin = req.session ? req.session.login : false
        if (isLogin) {
            res.json(getResponseData(false, 'already login'))

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
    @get('/logout')
    logout(req: BodyRequest, res: Response) {
        if (req.session) {
            req.session.login = false
        }
        res.json(getResponseData(true))
    }
    @get('/')
    home(req: BodyRequest, res: Response) {
        const isLogin = req.session ? req.session.login : false
        if (isLogin) {
            res.send(`
        <html>
        <body>
        <a href='/getData'>Get </a>
        <br/>
        <a href='/showData'>Show </a>
        <br/>
        <a href='/logout'>Log out </a>
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