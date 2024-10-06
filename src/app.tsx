import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { type JSX, Suspense } from "solid-js";
import { Layout } from "./features/app-shell";
import { SITE } from "./site";
import "./app.css";

export default function App(): JSX.Element {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>{SITE.name}</Title>
          <Layout>
            <Suspense>{props.children}</Suspense>
          </Layout>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
