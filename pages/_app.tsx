import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { UserContextProvider } from "@/supabase/authentication";
import { supabase } from "@/supabase/index";
import { ThemeProvider } from "@material-ui/core/styles";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@material-ui/core/CssBaseline";
import createCache from "@emotion/cache";
import theme from "@/styles/theme";
import "../styles/globals.css";

export const cache = createCache({ key: "css", prepend: true });

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  // @ts-expect-error
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <CacheProvider value={cache}>
      <Head>
        <title>SynCollab</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <UserContextProvider supabaseClient={supabase}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </UserContextProvider>
    </CacheProvider>
  );
}
