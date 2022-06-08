interface PostProps {
    username: string,
    content: string
}

function Post({username, content}: PostProps) {
    return (
        <div className='flex
                        p-3
                        border-b
                        border-[#38444d]'>
            <div className='flex-1 px-4'>
                <div>
                    <span className="font-bold text-xl">{username}</span>
                    <div className="my-2">{content}</div>
                </div>
            </div>
        </div>
    )
}

export default Post;
