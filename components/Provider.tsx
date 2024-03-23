"use client";
import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const client = new ApolloClient({
    uri:
      "https://graphql-app-olive.vercel.app/api/graphql" ||
      "https://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
  });

  /*   const client = new ApolloClient({
    link: new HttpLink({
      uri: "https://graphql-app-olive.vercel.app/api/graphql",
      fetchOptions: {
        mode: "no-cors",
      },
    }),
    cache: new InMemoryCache(),
  }); */

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;
