// Error handler; DO NOT MOVE/RENAME THIS FILE
import { Handler } from 'suivle'

export default ({ html, path }: Handler) => {
    return html(`<code>${path}</code> doesn't exist.`, 404)
}
