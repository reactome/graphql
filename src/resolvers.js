// let neo4j = require("neo4j-driver");
// let driver = neo4j.driver(
//   "bolt://localhost:7687",
//   neo4j.auth.basic("neo4j", "reactome")
// );

// const resolveFunctions = {
//   Reaction: {
//     input(obj, args, context, info) {
//       let session = driver.session(),
//         params = { dbId: args.dbId },
//         query = `
//             MATCH (r:Reaction)-[:input]->(pe:PhysicalEntity)
//             WHERE r.dbId = $dbId
//             RETURN pe;
//           `;
//       console.log(`I am ${params}`);
//       return session.run(query, params).then((result) => {
//         return result.records.map((record) => {
//           return record.get("pe").properties;
//         });
//       });
//     },
//     // genres(movie) {
//     //   let session = driver.session(),
//     //     params = { movieId: movie.movieId },
//     //     query = `
//     //         MATCH (m:Movie)-[:IN_GENRE]->(g:Genre)
//     //         WHERE m.movieId = $movieId
//     //         RETURN g.name AS genre;
//     //       `;
//     //   return session.run(query, params).then((result) => {
//     //     return result.records.map((record) => {
//     //       return record.get("genre");
//     //     });
//     //   });
//     // },
//   },
// };

// export default resolveFunctions;

// // ----------------- Custom Resolver - 1 -------------------
// // import reactionResolver from "./resolvers/reaction";
// // import proteinResolver from "./resolvers/protein";
// // import physicalEntityResolver from "./resolvers/physicalEntity";

// // export const resolvers = {
// //   Query: {
// //     Reaction: (obj, args, context, info) => {
// //       let session = context.driver.session(),
// //         params = { dbId: args.dbId },
// //         query = `MATCH (rle:ReactionLikeEvent) WHERE rle.dbId = $dbId RETURN rle`;

// //       return session.run(query, params).then((result) => {
// //         return result.records.map((rec) => rec.get("rle"));
// //       });
// //     },
// //     Protein: (obj, args, context, info) => {
// //       let session = context.driver.session(),
// //         params = { dbId: args.dbId },
// //         query = `MATCH (ewas:EntityWithAccessionedSequence) WHERE ewas.dbId = $dbId RETURN ewas`;

// //       return session.run(query, params).then((result) => {
// //         return result.records.map((rec) => rec.get("ewas"));
// //       });
// //     },
// //     PhysicalEntity: (obj, args, context, info) => {
// //       let session = context.driver.session(),
// //         params = { dbId: args.dbId },
// //         query = `MATCH (pe:PhysicalEntity) WHERE pe.dbId = $dbId RETURN pe`;

// //       return session.run(query, params).then((result) => {
// //         return result.records.map((rec) => rec.get("pe"));
// //       });
// //     },
// //   },
// //   Reaction: reactionResolver,
// //   Protein: proteinResolver,
// //   PhysicalEntity: physicalEntityResolver,
// // };
