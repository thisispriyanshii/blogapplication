import Head from 'next/head';

import '../styles/globals.css';
import Layout from '../components/layout/layout';
import { AuthContextProvider } from '../components/store/auth-context';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Layout>
        <Head>
           <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;
