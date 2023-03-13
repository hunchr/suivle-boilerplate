// GET: http://localhost:4000/api/@octocat/posts/1234?sort=mostLiked
// GET: http://localhost:4000/api/@octocat/posts/12345
import { Handler } from 'suivle'

export const handle = async ($: Handler) => {
    const postId = $.getParam('postId')
    
    if (postId !== '1234') {
        return 404
    }
    
    return {
        username: $.getParam('username'),
        postId: postId,
        sort: $.getSearchParam('sort')
    }
}
