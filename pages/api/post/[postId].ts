import type { NextApiRequest, NextApiResponse } from 'next';
import { create } from 'ipfs-http-client';

const ipfsClient = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
});

type ResponseData = {
    content: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method != 'GET') {
        res.status(405).end()

        return;
    }

    const { postId } = req.query;

    if (!postId) {
        res.status(400).end('Post id should not be empty')
    }

    const response = await ipfsClient.cat(postId);

    let content: any[] = [];
    for await (const chunk of response) {
        content = [...content, ...chunk];
    }

    const raw = Buffer.from(content).toString('utf8');

    res.status(200).json({ content: raw})
}
