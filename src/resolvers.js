import reactionResolver from "./resolvers/reaction";

export const resolvers = {
  Query: {
      Reaction: (obj, args, context, info) => {
          let session = context.driver.session(),
            params = {dbId : args.dbId},
            query = `MATCH (rle:ReactionLikeEvent) WHERE rle.dbId = $dbId RETURN rle`;

          return session.run(query, params).then((result) => {
            return result.records.map(rec => rec.get("rle"));
          });
      }
  },
  Reaction: reactionResolver
};
