
import { Request, Response, } from 'express'
import 'reflect-metadata'
import { get, controller } from './decorator'
import { getResponseData } from '../utils/util';


interface BodyRequest extends Request {
    body: {
        [key: string]: string | undefined
    }

}

@controller
class LoginController {
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