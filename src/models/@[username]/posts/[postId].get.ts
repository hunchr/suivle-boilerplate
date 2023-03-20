// GET: http://localhost:4000/api/@octocat/posts/1234?sort=mostLiked
// GET: http://localhost:4000/api/@octocat/posts/12345
import { Handler } from 'suivle'

export default ({ json, param, qparam }: Handler) => {
    const postId = param('postId')
    
    if (postId !== '1234') {
        return json(null, 404)
    }
    
    return json({
        username: param('username'),
        postId: postId,
        sort: qparam('sort')
    })
}
