import express, { NextFunction, Request, Response } from 'express'
import cookieSession from 'cookie-session'
import bodyParser from 'body-parser'
import './controller/loginController'
import './controller/CrawlerController'
import router from './router'
const app = express()


app.use((bodyParser.urlencoded({ extended: false })))
app.use(cookieSession({
    name: 'session',
    keys: ['leon'],
    maxAge: 24 * 60 * 60 * 1000
}))

app.use(router)

app.listen(7001, () => {
    console.log('server is running')
})