import { ChakraProvider, Heading, Text, VStack } from "@chakra-ui/react";
import { withEmotionCache } from "@emotion/react";
import React, { useState } from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";

import { theme } from "./chackra-ui/theme/theme";
import { ClientStyleContext, ServerStyleContext } from "./context";
import { AppProvider } from "./context/app/app-context";

import type { MetaFunction } from "remix";
export const meta: MetaFunction = () => {
  return { title: "Font Scale" };
};

export type ContextType = {
  isPanelCollapsed: boolean;
  togglePanelCollapse: () => void;
};

export default function App() {
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  function togglePanelCollapse() {
    setIsPanelCollapsed(!isPanelCollapsed);
  }

  const context: ContextType = { isPanelCollapsed, togglePanelCollapse };

  return (
    <Document>
      <ChakraProvider resetCSS theme={theme}>
        <AppProvider>
          <Outlet context={context} />
        </AppProvider>
      </ChakraProvider>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document>
      <VStack h="100vh" justify="center">
        <Heading>There was an error</Heading>
        <Text>{error.message}</Text>
        <hr />
        <Text>
          Hey, developer, you should replace this with what you want your users
          to see.
        </Text>
      </VStack>
    </Document>
  );
}

export function CatchBoundary() {
  let caught = useCatch();
  let message;
  switch (caught.status) {
    case 401:
      message = (
        <Text>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </Text>
      );
      break;
    case 404:
      message = (
        <Text>
          Oops! Looks like you tried to visit a page that does not exist.
        </Text>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document>
      <VStack h="100vh" justify="center">
        <Heading>
          {caught.status}: {caught.statusText}
        </Heading>
        {message}
      </VStack>
    </Document>
  );
}

interface DocumentProps {
  children: React.ReactNode;
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverSyleData = React.useContext(ServerStyleContext);
    const clientStyleData = React.useContext(ClientStyleContext);

    // Only executed on client
    React.useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
          {serverSyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
        </body>
      </html>
    );
  }
);
