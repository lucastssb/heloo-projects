import Head from 'next/head';
import React from 'react';
import Layout from '../components/Layout';
import { ProjectsProvider } from '../contexts/ProjectsContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <ProjectsProvider>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ProjectsProvider>
    );
}

export default MyApp;
