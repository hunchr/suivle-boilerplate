// http://localhost:4000/
import { Handler } from 'suivle'

export default ({ html, version }: Handler) => {
    console.log(version); // Global variable defined in index.js
    
    return html('Hello Suivle') // Return HTML page
}
