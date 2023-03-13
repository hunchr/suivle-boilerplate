# Suivle Example/Boilerplate
Documentation and boilerplate for [Suivle](https://github.com/hunchr/suivle) (pronounced swivel)

## Documentation
### Folder Structure
The folder structure (src) MUST look like this:\
<img width="128" src="https://raw.githubusercontent.com/hunchr/suivle/main/docs/img/folder-structure.png" alt="Folder Structure">

#### Public Folder (```./src/public/```)
* For static files
* Files are served at http://localhost:4000/path/to/file
* Only files indexed at server start are served (i.e. not for user content => CDN)

#### Models Folder (```./src/models/```)
* For REST-API
* Files MUST have an [HTTP request method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) before the file extension (e.g. filename.get.ts)
* Served at http://localhost:4000/api/path/to/file

#### Views Folder (```./src/views/```)
* For HTML
* Served at http://localhost:4000/path/to/file (same as public folder)

### Main File
The ```./src/index.ts``` file should look like this:
```ts
import { Suivle } from 'suivle'

const app = new Suivle({
    host: 'localhost',
    port: 4000
})

console.log(`🚀 Suivle is running on ${app.host}:${app.port}`)
```

To add global variables or functions which can be used in every file, you just have to add a *globals* object to the Suivle config, like this:
```ts
const app = new Suivle({
    globals: {
        version: '1.0.0',
        ping: () => 'pong'
    }
})
```

#### File Params
* Params must be in brackets (i.e. *[* and *]*)
* RegExp to parse params can be configured in the main file

Example: To parse the username from the request http://localhost:4000/@octocat, you can create a file named ```./src/views/@[username].ts``` and place the RegExp to match the params in the *params* key:
```ts
const app = new Suivle({
    params: /@[a-z-]+/g
})
```

### Handler
Every file in the ```models```/```views``` folder MUST have an async function named *handle*:
```ts
import { Handler } from 'suivle'

export const handle = async ($: Handler) => {
    console.log($.version) // 1.0.0; Get global variable which was defined in the main file
    return 'Hello Suivle'
}
```

#### Files In Views Folder
* To show an HTML page, return a string
* To throw an error, return an object with the [HTTP status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) and (optional) an HTML error message
* If no error message is returned, the message will default to the one returned in the error handler (see section 'Error File')
```ts
export const handle = async () => {
    return '<p>access allowed<p>' // 200: OK
    return [403, '<code>access denied!</code>'] // 403: Forbidden
    return [403] // 403: Forbidden; Default message from error handler
}
```

#### Files In Models Folder
* To print the JSON, return an object
* To throw an error, return an HTTP status code
```ts
export const handle = async () => {
    return { msg: 'Hello API' } // 200: OK
    return 404 // 404: Not Found
}
```

### Handler Functions
```ts
console.log(
    $.getHeader('user-agent'),
    $.getCookie('sessionId'),
    $.getParam('id'), // Get id from e.g. /posts/1234 if file name is /posts/[id].ts
    $.getSearchParam('sort'), // Get query param from e.g. /posts?sort=mostLiked
)
```

### Error Handler
* The file to handle errors MUST be located at ```./src/views/error.ts```
* It also needs an async *handle* function, like all other files
* The returned string will be shown as error page
```ts
import { Handler } from 'suivle'

export const handle = async ($: Handler, err: [number, string] | number) => {
    console.log('httpStatus:', err[0] ?? err)

    const errMsg = err[1] ?? `<code>${$.path}</code> doesn't exist.`
    return errMsg
}
```
