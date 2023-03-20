// GET: http://localhost:4000/api/
import { Handler } from 'suivle'

export default ({ json }: Handler) => {
    return json({ msg: 'Welcome to the API' })
}
