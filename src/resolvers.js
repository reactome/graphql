import reactionResolver from "./resolvers/reaction";
import proteinResolver from "./resolvers/protein";

export const resolvers = {
  Query: {
    Reaction: (obj, args, context, info) => {
      let session = context.driver.session(),
        params = { dbId: args.dbId },
        query = `MATCH (rle:ReactionLikeEvent) WHERE rle.dbId = $dbId RETURN rle`;

      return session.run(query, params).then((result) => {
        return result.records.map((rec) => rec.get("rle"));
      });
    },
    Protein: (obj, args, context, info) => {
      let session = context.driver.session(),
        params = { dbId: args.dbId },
        query = `MATCH (ewas:EntityWithAccessionedSequence) WHERE ewas.dbId = $dbId RETURN ewas`;

      return session.run(query, params).then((result) => {
        return result.records.map((rec) => rec.get("ewas"));
      });
    },
  },
  Reaction: reactionResolver,
  Protein: proteinResolver,
};
