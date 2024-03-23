"use client";
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const client = new ApolloClient({
    uri:
      "http://localhost:3000/api/graphql" ||
      "https://graphql-app-olive.vercel.app/api/graphql",
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;
