import { Methods } from './request';
import { RequestHandler } from 'express';
import router from '../router'

export function controller(root: string) {
    return function (target: new (...args: any[]) => any) {
        for (let key in target.prototype) {
            const path: string = Reflect.getMetadata('path', target.prototype, key)
            const method: Methods = Reflect.getMetadata('method', target.prototype, key)
            const handler = target.prototype[key]
            const middleware: RequestHandler = Reflect.getMetadata('middleware', target.prototype, key)
            if (path && method) {

                const fullPath = root !== '/' ? `${root}${path}` : `${path}`
                if (middleware) {
                    router[method](fullPath, middleware, handler)
                } else {
                    router[method](fullPath, handler)
                }
            }
        }

    }
}
