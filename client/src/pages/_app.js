import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import Layout from '../components/Layout';
import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  // Handle basePath for GitHub Pages
  useEffect(() => {
    // Fix asset paths for GitHub Pages
    if (process.env.NODE_ENV === 'production') {
      const basePath = '/TradeShiksha';
      // Add any additional path fixing logic here if needed
    }
  }, []);

  // Check if the page has a getLayout function
  const getLayout = Component.getLayout || ((page) => 
    <Layout transparentNav={Component.transparentNav}>{page}</Layout>
  );

  return (
    <AuthProvider>
      {getLayout(<Component {...pageProps} />)}
    </AuthProvider>
  );
}

export default MyApp;