import { AppContext, AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";
import { wrapper } from "../store";
import App from "next/app";
import { cookieStringToObject } from "../lib/utils";
import { meAPI } from "../lib/api/auth";
import { userActions } from "../store/user";
import axios from "../lib/api";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (context: AppContext) => {
    const appInitialPrps = await App.getInitialProps(context);
    const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
    const { isLogged } = store.getState().user;

    try {
      if (!isLogged && cookieObject.access_token) {
        axios.defaults.headers.cookie = cookieObject.access_token;
        const { data } = await meAPI();
        store.dispatch(userActions.setLoggedUser(data));
      }
    } catch (e) {
      console.log(e);
    }

    return { ...appInitialPrps };
  }
);

export default wrapper.withRedux(MyApp);
