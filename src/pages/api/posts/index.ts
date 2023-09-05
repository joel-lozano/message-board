import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import prisma from '@lib/prisma';

const getPosts = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const posts = await prisma.post.findMany({
            where: { published: true },
            include: {
                author: {
                    select: { name: true, email: true, image: true },
                }
            }
        });

        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error retrieving posts' });
    }
}

const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
    const { content, published } = req.body;

    try {
        const session = await getServerSession(req, res, authOptions);
        if (!session || !session.user || !session.user.email) {
            return res.status(401).json({ error: 'User not signed in.' });
        }

        const result = await prisma.post.create({
            data: {
                content,
                published,
                author: { connect: { email: session.user.email }}
            },
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating post' });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            getPosts(req, res);
            break;
        case 'POST':
            createPost(req, res);
            break;
        default:
            res.status(405).json({ error: 'Method Not Allowed' });
    }
}