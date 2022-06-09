import type { NextApiRequest, NextApiResponse } from 'next';
import { create } from 'ipfs-http-client';

const ipfsClient = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
});

type PublishPostDTO = {
    content: string
}

type ResponseData = {
    hash: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method != 'POST') {
        res.status(405).end()

        return;
    }

    const post = req.body as PublishPostDTO;

    if (!post.content) {
        res.status(400).end('Content should not be empty')
    }

    const result = await ipfsClient.add(post.content);

    res.status(200).json({ hash: result.path });
}
