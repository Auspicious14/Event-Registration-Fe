import '../styles/globals.css';
import '../styles/colors.css';
import 'react-toastify/dist/ReactToastify.css';

// import { SpeedInsights } from '@vercel/speed-insights/next';
import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

import { AppContextProvider } from '../context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      {/* <SpeedInsights /> */}
    </AppContextProvider>
  );
}

export default MyApp;
