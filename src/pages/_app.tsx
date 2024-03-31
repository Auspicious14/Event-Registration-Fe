import { AppProps } from 'next/app';
import '../styles/globals.css';
import '../styles/colors.css';
import { ToastContainer } from 'react-toastify';
import { AppContextProvider } from '../context';
import 'react-toastify/dist/ReactToastify.css';

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
    </AppContextProvider>
  );
}

export default MyApp;
