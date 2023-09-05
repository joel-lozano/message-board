import { CSSProperties } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import styles from './Header.module.css';

const Header = () => {
    const router = useRouter();
    const { data: session } = useSession();

    interface IconLinkProps {
        to: string;
        title: string;
        children: React.ReactNode;
    };
    
    const IconLink = ({ to, title, children }: IconLinkProps) => {
        const isActive = router.pathname === to;
        const style: CSSProperties = {
            color: isActive ? '#cd7121' : '#45caff',
            textDecoration: isActive ? 'underline' : 'none',
            fontSize: '2rem',
        };

        return (
            <Link
                href={to}
                title={title}
                className='material-symbols-outlined'
                style={style}
            >
                {children}
            </Link>
        )
    };

    return (
        <header>
            <nav className={styles.nav}>
                <span className={styles.icons}>
                    <IconLink to='/' title='Home'>
                        home
                    </IconLink>
                    {
                        session?.user && (
                            <>                            
                                {/* <IconLink to='/profile' title='My Account'>
                                    account_circle
                                </IconLink> */}
                                <IconLink to='/drafts' title='Drafts'>
                                    edit_note
                                </IconLink>
                            </>
                        )
                    }
                </span>
                {
                    session?.user ?
                    <Link href='/api/auth/signout' className={styles.link}>Log Out</Link> :
                    <Link href='/api/auth/signin' className={styles.link}>Log In</Link>
                }
            </nav>
        </header>
    );
}

export default Header;
