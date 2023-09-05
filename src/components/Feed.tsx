import { IPost } from '@/types/common';
import Post from './Post';

import styles from './Feed.module.css';

interface FeedProps {
    posts: IPost[];
}

const Feed = ({ posts }: FeedProps) => {
    return (
        <ul className={styles.feed}>
            {posts.map((post) => <li key={post.id}><Post post={post} /></li>)}
        </ul>
    )
}

export default Feed;