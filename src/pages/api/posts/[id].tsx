import prisma from '@lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const updatePost = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
    const { content, published } = req.body;

    try {
        const post = await prisma.post.update({
            where: { id },
            data: { content, published }
        });
    
        res.json(post);
    } catch (err) {
        res.json({ message: `Error updating post ${id}.` })
        console.error(err);
    }
}

const deletePost = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

    try {
        await prisma.post.delete({ where: { id }});
        res.json({ message: 'Post deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: `Error deleting post ${id}.` })
        console.error(err);
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'PUT':
            updatePost(req, res);
            break;
        case 'DELETE':
            deletePost(req, res);
            break;
        default:
            res.status(405).json({ error: 'Method not allowed' });
    }
}