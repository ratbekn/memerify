import CreatePost from '../components/CreatePost'
import Post from '../components/Post';

const posts = [
    {
        username: 'Bob',
        content: 'Hello, World!'
    },
    {
        username: 'Alice',
        content: 'Hello, World!'
    },
    {
        username: 'John',
        content: 'Hello, World!'
    }
];

function Feed() {
    return (
        <div>
            <CreatePost/>
            {
                posts.map((post, index) =>
                    <Post key={index} username={post.username} content={post.content}/>
                )
            }
        </div>
    );
}

export default Feed;
