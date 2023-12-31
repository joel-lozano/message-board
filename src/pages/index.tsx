import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import Layout from '@/components/layout/Layout';
import Feed from '@/components/Feed';
import PostEditor from '@/components/PostEditor';

import { IPost } from '@/types/common';
import styles from './index.module.css';

const Home = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState<IPost[]>([]);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/posts/');
            const data = await res.json();
            setPosts(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <Layout>
            <main className={styles.main}>
                {session?.user ? <PostEditor /> : <h1>Log in to start posting.</h1>}
                <Feed posts={posts.reverse()} />
            </main>
        </Layout>
    )
}

export default Home;