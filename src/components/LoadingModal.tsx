import React from 'react';
import styles from '../styles/components//LoadingModal.module.css';

export default function LoadingModal() {
    return (
        <div className={styles.loadingModalOverlay}>
            <h1>Loading...</h1>
        </div>
    );
}