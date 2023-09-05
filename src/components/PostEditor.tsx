import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './PostEditor.module.css';

interface PostEditorProps {
    id?: string;
    initialContent?: string;
    closeModal?: () => void;
}

const PostEditor = ({ id, initialContent, closeModal }: PostEditorProps) => {
    const [content, setContent] = useState<string>(initialContent ? initialContent : '');
    const { data: session } = useSession();
    const router = useRouter();

    if (!session || !session.user) {
        console.error('Error: Post editor rendered without user logged in.');
        return;
    }

    const user = session.user;

    const handlePostClick = async (event: React.MouseEvent<HTMLButtonElement>, published: boolean): Promise<void> => {
        if (!published) {
            toast.success('Posted to drafts.', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: true,
                theme: 'colored'
            });
        }

        try {
            // Using fetch because axios does not send POST request body
            let method = 'POST';
            let destination = '/api/posts/';

            if (id) {
                method = 'PUT';
                destination += `/${id}`
            }

            const res = await fetch(destination, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content, published }),
            });

            console.log(await res.json());

            if (!res.ok) {
                throw new Error(await res.json())
            }
            
            setContent('');
            if (closeModal) {
                closeModal();
            }
            
            if (published) {
                router.reload();
            }
        }
        catch (err: any) {
            console.log(err.message);
        }
    }

    return (
        <div className={styles['new-post-input']}>
            <ToastContainer />
            <span className={styles.author}>
                <img src={user.image ? user.image : '/default-profile.png'} />
                <h2>{user.name}</h2>
            </span>
            <textarea
                className='content'
                placeholder="What's on your mind?"
                value={content}
                onChange={(event) => setContent(event.target.value)}
            />
            {
                closeModal &&
                <button onClick={() => {closeModal()}} className={styles['cancel-button']}>
                    Cancel
                </button>
            }
            <button
                className={styles['draft-button']}
                onClick={(event) => handlePostClick(event, false)}
                disabled={!content}
            >
                Save to Drafts
            </button>
            <button
                className={styles['post-button']}
                onClick={(event) => handlePostClick(event, true)}
                disabled={!content || content === initialContent}
            >
                Post
            </button>
        </div>
    )
}

export default PostEditor;