import {FormEvent, useState} from 'react';

import {ethers} from 'ethers';

import PostContract from '../contracts/PostStorage.json';

function CreatePost() {
    const contentMaxLength = 140;
    const [content, setContent] = useState('');
    const [contentLength, setContentLength] = useState(0);

    const addPost = async (hash: string) => {
        let post = {
            'content': hash,
            'isDeleted': false
        };

        try {
            // @ts-ignore
            const {ethereum} = window;

            if(ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const postContract = new ethers.Contract(
                    '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
                    PostContract.abi,
                    signer
                )

                let addTransaction = await postContract.addPost(post.content, post.isDeleted);

                console.log(addTransaction);
            } else {
                console.log("Can't find Ethereum object. Check if MetaMask installed or try using another browser");
            }
        } catch(error) {
            console.log('Error adding post metadata to blockchain', error);
        }
    }

    const publish = async (event: any) => {
        event.preventDefault();

        if (!content) {
            return
        }

        const response = await fetch('/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({content: content})
        });

        if (!response.ok) {
            throw new Error(`Error on publishing post: ${response.status}`);
        }

        const { hash } = await response.json();

        await addPost(hash);

        setContent('');
        setContentLength(0);
    }

    const countContentLength = async (event: FormEvent<HTMLTextAreaElement>) => {
        const length = event?.currentTarget?.value.length;

        setContentLength(length);
    }

    return (
        <div className="flex">
            <div className="flex-1 flex-col">
                <form>
                    <div
                        className="w-full border border-[#38444d]">
                        <div className="py-2 px-4 bg-white">
                            <label htmlFor="comment" className="sr-only">Your comment</label>
                            <textarea id="comment"
                                      rows={4}
                                      className="outline-none px-0 w-full text-sm bg-transparent resize-none"
                                      placeholder="What's happening?"
                                      value={content}
                                      onChange={event => setContent(event.target.value)}
                                      maxLength={contentMaxLength}
                                      onInput={event => countContentLength(event)}
                                      required />
                        </div>
                        <div className="flex justify-between items-center py-2 px-3">
                            <div>{contentLength}/{contentMaxLength}</div>
                            <button type="submit"
                                    onClick={event => publish(event)}
                                    disabled={!content}
                                    className={`outline-none inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white rounded-lg
                                    ${content ? `bg-[#15202b]` : `bg-gray-500`}`}>
                                Publish
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;
