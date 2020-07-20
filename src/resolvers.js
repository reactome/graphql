let neo4j = require("neo4j-driver");

export const resolvers = {
  Reaction: {
    schemaClass: (obj, args, context, info) => {
      //return `MATCH (n:Reaction) WHERE EXISTS(n.schemaClass) RETURN n.schemaClass AS schemaClass`;
      //const options = [0, 5, 10, 15, 30, 45];
      //return options[Math.floor(Math.random() * options.length)];
      let session = driver.session(),
        params = {},
        query = `MATCH (n:Reaction) WHERE EXISTS(n.schemaClass) RETURN n.schemaClass AS schemaClass`;
      return session.run(query, params).then((result) => {
        return result;
      });
    },
  },
};
