import React from 'react';
import Form from '../components/Form';

import styles from '../styles/pages/CreateProject.module.css';

export default function CreateProject() {
    return(
        <div className={styles.createProjectContainer}>
            <h2>Criar projeto</h2>
            {/* <div className={styles.formWrapper}>
                <Form />
            </div> */}

            <Form />
        </div>
    );
}