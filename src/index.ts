import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { isDogInImage } from "./helper";
const app = express();

const typeDefs = gql`
  type Query {
    isDogPresent(imageUrl: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    isDogPresent: async (_: any, { imageUrl }: { imageUrl: string }) => {
      try {
        const output = (await isDogInImage(imageUrl)) as unknown as string;
        return output == "true" ? true : false;
      } catch (error: any) {
        console.log(error);
      }
    },
  },
};

let server: ApolloServer | null = null;

async function startServer() {
  server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  server.applyMiddleware({ app });
}
startServer().then(() => {
  server!.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server!.graphqlPath}`)
  );
});
