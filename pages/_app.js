import { useEffect } from 'react'
import '../styles/globals.css'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react';

const clientSideEmotionCache = createCache({ key: 'css' })

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <CacheProvider value={emotionCache}>
    <Component {...pageProps} />
    </CacheProvider>)
}

export default MyApp
