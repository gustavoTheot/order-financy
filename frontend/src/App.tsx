import { ApolloProvider } from "@apollo/client/react";
import { BrowserRouter } from "react-router-dom";
import { apolloClient } from "@/lib/apollo";
import { Router } from "./router";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Router />
        <Toaster />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
