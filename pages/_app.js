import styles from "../styles/sass/styles.scss";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Analytics />
    </SessionProvider>
  );
}

export default MyApp;
