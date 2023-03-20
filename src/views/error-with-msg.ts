// http://localhost:4000/error-with-msg
import { Handler } from 'suivle'

export default ({ html }: Handler) => {
    return html('enhance your calm', 420)
}
