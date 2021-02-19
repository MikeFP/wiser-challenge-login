import { storeWrapper } from "../stores/auth/auth-store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default storeWrapper.withRedux(MyApp);
