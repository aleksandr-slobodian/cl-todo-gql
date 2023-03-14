import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Context, createContext } from "./context";
import { schema } from "./schema";

const server = new ApolloServer<Context>({
  schema,
});

async function StartServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: createContext,
  });

  console.log(`🚀 Server listening at: ${url}`);
}

StartServer();
