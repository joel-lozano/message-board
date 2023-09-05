import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';

import Layout from '@/components/layout/Layout';
import { IPost } from '@/types/common';
import prisma from '@lib/prisma';
import Feed from '@/components/Feed';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getSession({ req });
    if (!session || !session.user || ! session.user.email) {
        res.statusCode = 403;
        return { props: { drafts: [] } };
    }

    const drafts = await prisma.post.findMany({
        where: {
            author: { email: session.user.email },
            published: false,
        },
        include: {
            author: {
                select: { name: true, image: true, email: true },
            },
        },
    });

    return { props: {
        drafts: JSON.parse(JSON.stringify(drafts))
    }};
}

interface DraftsPageProps {
    drafts: IPost[];
}

const Drafts = ({ drafts }: DraftsPageProps) => {
    const { data: session } = useSession();
    
    if (!session) {
        return (
            <Layout>
                <h1>Drafts</h1>
                <p>You have to be signed in to view this page.</p>
            </Layout>
        )
    }

    return (
        <Layout>
            <main>
                <h1>My Drafts</h1>
                <Feed posts={(drafts as IPost[]).reverse()} />
            </main>
        </Layout>
    );
}

export default Drafts;