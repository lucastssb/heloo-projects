import React from 'react';
import styles from '../styles/components/ShimmerProjectItem.module.css';

export default function ShimmerProjectItem() {
    return (
        <div className={styles.shimmerProjectItemContainer}>
            <div className={styles.shine}></div>
            <span className={styles.shine}></span>
        </div>
    );
}
