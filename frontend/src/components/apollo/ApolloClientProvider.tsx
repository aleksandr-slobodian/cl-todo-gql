import React, { PropsWithChildren } from "react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../../apollo/client";

export const ApolloClientProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
