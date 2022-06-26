import { useEffect } from 'react'
import '../styles/globals.css'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react';
import { StoreProvider } from '../utils/Store';
import { SnackbarProvider } from 'notistack';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

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
    <SnackbarProvider
     anchorOrigin={{ vertical: 'top', horizontal: 'center'}}>
    <CacheProvider value={emotionCache}>
      <StoreProvider>
      <PayPalScriptProvider deferLoading={true}>
            <Component {...pageProps} />
          </PayPalScriptProvider>
      </StoreProvider>
    </CacheProvider>
    </SnackbarProvider>
    )
}

export default MyApp
