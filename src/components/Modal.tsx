import { ReactNode } from 'react';

import styles from './Modal.module.css';

interface ModalProps {
    isOpen: boolean;
    setOpen: (value: boolean) => void;
    title: string;
    button?: { type: string, onClick: () => void};
    children: ReactNode;
}

const Modal = ({ isOpen, setOpen, title, children, button }: ModalProps) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles['modal-overlay']}>
            <div className={styles.modal}>
                <h2>{title}</h2>
                <div className={styles.content}>
                    {children}
                </div>
                {
                    button &&        
                    <div className={styles.buttons}>
                        <button onClick={() => {setOpen(false)}} className={styles.cancel}>
                            Cancel
                        </button>
                        <button onClick={() => {button.onClick()}} className={styles[button.type]}>
                            {button.type.charAt(0).toUpperCase() + button.type.slice(1)}
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Modal;