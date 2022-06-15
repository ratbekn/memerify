import {useState, useEffect, useCallback} from 'react';
import {ethers} from 'ethers';

import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import PostContract from '../contracts/PostStorage.json';

type Post = {
    id: number,
    username: string,
    content: string
}

function Feed() {
    const [posts, setPosts] = useState<Post[]>([]);

    const getPosts = useCallback(async () => {
        try {
            // @ts-ignore
            const {ethereum} = window;

            if (!ethereum) {
                console.log('Can\'t find Ethereum object. Check if MetaMask installed or try using another browser');

                return;
            }

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const postContract = new ethers.Contract(
                '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
                PostContract.abi,
                signer
            );

            const allPosts = await postContract.getPosts();

            let newPosts: Post[] = [];
            for (const newPost of allPosts) {
                const response = await fetch(`/api/post/${newPost.content}`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error(`Error on retrieving post: ${response.status}`);
                }

                const {content} = await response.json();

                newPosts = [...newPosts, {id: newPost.id, username: newPost.username, content: content}];
            }

            setPosts(newPosts);

        } catch (error) {
            console.log(`Error on loading all posts: ${error}`);
        }
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            console.log('getPosts called');
            return getPosts();
        }, 15000);

        getPosts();

        return () => clearInterval(id);
    }, [getPosts]);

    return (
        <div>
            <CreatePost />
            {
                posts.map((post, index) =>
                    <Post key={post.id} username={post.username} content={post.content}/>
                )
            }
        </div>
    );
}

export default Feed;
