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
* Files should have an [HTTP request method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) before the file extension (e.g. filename.get.ts)
* HTTP request method defaults to GET
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
Every file in the ```models```/```views``` folder MUST export a default function:
```ts
import { Handler } from 'suivle'

export default ({ html, version }: Handler) => {
    console.log(version); // 1.0.0; Get global variable which was defined in the main file
    return html('Hello Suivle')
}
```

#### Files In Views Folder
* To show an HTML page, return a string
* The second parameter is the [HTTP status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) and defaults to 200
```ts
export default ({ html }: Handler) => {
    return html('<p>access allowed<p>') // 200: OK
    return html('<code>access denied!</code>', 403) // 403: Forbidden
}
```

#### Files In Models Folder
* Use the json function to return JSON data
```ts
export default ({ json }: Handler) => {
    return json({ msg: 'Hello API' }) // 200; { msg: 'Hello API' }
    return json(null, 404) // 404; { reason: 404 }
    return json('not found', 404) // 404; { reason: 'not found' }
}
```

### Handler Functions
#### Getters
```ts
console.log(
    header('user-agent'),
    cookie('sessionId'),
    param('id'), // Get id from e.g. /posts/1234 if file name is /posts/[id].ts
    qparam('sort'), // Get query param from e.g. /posts?sort=mostLiked
)
```

### Error Handler
* The file to handle errors MUST be located at ```./src/views/error.ts```
* Will be executed if a file in ```models``` wasn't found
```ts
export default ({ html, path }: Handler) => {
    return html(`<code>${path}</code> doesn't exist.`, 404)
}
```
