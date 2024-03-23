import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import resolvers from "@/tools/server/graphql/resolvers";
import typeDefs from "@/tools/server/graphql/typeDefs";

const server = new ApolloServer({ resolvers, typeDefs });

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
