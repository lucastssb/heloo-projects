import React from 'react';
import styles from '../styles/components/Header.module.css';

export default function Header() {
    return (
        <header className={styles.headerContainer}>
            <img src="/images/logo.svg" alt="logo" />
        </header>
    );
}
