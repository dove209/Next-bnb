import { AppContext, AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";
import { wrapper } from '../store';
import App from 'next/app'
import { cookieStringToObject } from "../lib/utils";
import axios from '../lib/api';
import { meAPI } from "../lib/api/auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <div id='root-modal' />
    </>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const appInitialPrps = await App.getInitialProps(context)
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  // const { store } = context.ctx;
  console.log(context)
  // const { isLogged } = store.getState().user;
  // try {
  //   if (!isLogged && cookieObject.access_token) {
  //     axios.defaults.headers.cookie = cookieObject.accecc_token;
  //     const { data } = await meAPI()
  //   }
  // } catch (e) {
  //   console.log(e)
  // }

  return { ...appInitialPrps }
}


export default wrapper.withRedux(MyApp);

