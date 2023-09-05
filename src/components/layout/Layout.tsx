import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import styles from './Layout.module.css';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={styles['site-container']}>
            <Header />
            <div className={styles['main-container']}>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout;