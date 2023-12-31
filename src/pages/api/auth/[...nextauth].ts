import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@lib/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);
export default authHandler;

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || 'Error: No GOOGLE_ID',
            clientSecret: process.env.GOOGLE_SECRET || 'Error: No GOOGLE_SECRET'
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID || 'Error: No GITHUB_ID',
            clientSecret: process.env.GITHUB_SECRET || 'Error: No GITHUB_SECRET',
        }),
    ],
    prompt: 'select_account',
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
};