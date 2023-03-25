import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { PolybaseProvider } from '@polybase/react';
import { db } from "../lib/polybaseClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <PolybaseProvider polybase={db}>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "light",
      }}
    >
          <Component {...pageProps} />
    </MantineProvider>
  </PolybaseProvider>
  );
}

export default MyApp;