// http://localhost:4000/
import { Handler } from 'suivle'

export const handle = async ($: Handler) => {
    console.log($.version); // Global variable defined in index.js
    return 'Hello Suivle' // Return HTML page
}
