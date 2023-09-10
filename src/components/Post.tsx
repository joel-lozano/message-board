import { useState } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Modal from '@/components/Modal';
import PostEditor from '@/components/PostEditor';
import parseTimestamp from '@/utils/parseTimestamp';
import { IPost } from '@/types/common';

import styles from './Post.module.css';

interface PostProps {
    post: IPost;
}

const Post = ({ post }: PostProps) => {
    const { data: session } = useSession();
    const user = session?.user;

    const router = useRouter();

    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    const { date, time } = parseTimestamp(post.updatedAt);
    const profilePicture = post.author.image ? post.author.image : '/default-profile.png';
    const userIsAuthor = user && user.email === post.author.email;

    const handleDeleteClick = async () => {
        try {
            const res = await fetch(`/api/posts/${post.id}`,
                {
                    method: 'delete'
                }
            );

            if (res.status !== 200) {
                throw new Error(await res.json());
            }

            router.reload();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className={styles.post}>
            <Modal
                isOpen={editModalOpen}
                setOpen={setEditModalOpen}
                title='Edit Post'
            >
                <PostEditor id={post.id} initialContent={post.content} closeModal={() => setEditModalOpen(false)} />
            </Modal>
            <Modal
                isOpen={deleteModalOpen}
                setOpen={setDeleteModalOpen}
                title='Confirm Post Deletion'
                button={{ type: 'delete', onClick: handleDeleteClick }}
            >
                Are you sure you want to delete this post? It will be lost forever.
            </Modal>
            <div className={styles.header}>
                <span className={styles['top-left']}>
                    <img className={styles['profile-picture']} src={profilePicture} alt='Profile Picture' />
                    <span className={styles['header-text']}>
                        <h2 className={styles.name}>{post.author.name}</h2>
                        {/* <p className={styles.username}>{'@' + post.author.username}</p> */}
                    </span>
                </span>
            </div>
            <p className={styles.content}>{post.content}</p>
            <div className={styles.extras}>
                <p className={styles.timestamp}>{date} | {time}</p>
            </div>
            {userIsAuthor && (
                <>
                    <span
                        className={`material-symbols-outlined ${styles.icons} ${styles['pencil-icon']}`}
                        onClick={() => setEditModalOpen(true)}
                    >
                        edit
                    </span>
                    <span
                        className={`material-symbols-outlined ${styles.icons} ${styles['trash-icon']}`}
                        onClick={() => setDeleteModalOpen(true)}
                    >
                        delete
                    </span>
                </>
            )}
        </div>
    );
}

export default Post;