import { Suivle } from 'suivle'

const app = new Suivle({
    // Uncomment these properties if you want to change them
    // Every property is optional (it defaults to localhost:4000)

    // host: 'localhost',
    // port: 4000,
    // params: /(?<=\/\W)[a-z-]+|(?<=\/)\d+/g,
    // jsonHeaders: {
    //     'X-Powered-By': 'Suivle'
    // },
    // htmlHeaders: {
    //     'Content-Security-Policy': 'default-src \'self\';'
    // },
    globals: {
        version: '1.0.0'
    }
})

console.log(`🚀 Suivle is running on ${app.host}:${app.port}`)
// console.log(app.routes);
