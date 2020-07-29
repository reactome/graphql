
// PhysicalEntity Interface
import physicalEntityResolver from "./resolvers/PhysicalEntity/physicalEntity";
import complexResolver from "./resolvers/PhysicalEntity/complex";
import drugResolver from "./resolvers/PhysicalEntity/drug";
import entityWithAccessionedSequenceResolver from "./resolvers/PhysicalEntity/entityWithAccessionedSequence";
import genomeEncodedEntityResolver from "./resolvers/PhysicalEntity/genomeEncodedEntity";
import otherEntityResolver from "./resolvers/PhysicalEntity/otherEntity";
import polymerResolver from "./resolvers/PhysicalEntity/polymer";
import proteinResolver from "./resolvers/PhysicalEntity/protein";
import setResolver from "./resolvers/PhysicalEntity/set";
import simpleEntityResolver from "./resolvers/PhysicalEntity/simpleEntity";

// Event Interface
import eventResolver from "./resolvers/Event/event";
import pathwayResolver from "./resolvers/Event/pathway";
import reactionResolver from "./resolvers/Event/reaction";

// ReferenceEntity Interface
import referenceEntityResolver from "./resolvers/ReferenceEntity/referenceEntity"
import referenceDatabaseResolver from "./resolvers/ReferenceEntity/referenceDatabase"
import referenceGeneProductResolver from "./resolvers/ReferenceEntity/referenceDatabase"
import referenceMoleculeResolver from "./resolvers/ReferenceEntity/referenceMolecule"


const resolvers = {
  Query: {
    Reaction: (parent, args, context, info) => {
      let session = context.driver.session(),
        params = { dbId: args.dbId },
        query = `MATCH (rle:ReactionLikeEvent) WHERE rle.dbId = $dbId RETURN rle`;

      return session.run(query, params).then((result) => {
        const record = result.records[0].get("rle");
        return record;
      });
    },
    Pathway: (parent, args, context, info) => {
      let session = context.driver.session(),
        params = { dbId: args.dbId },
        query = `MATCH (p:Pathway) WHERE p.dbId = $dbId RETURN p`;

      return session.run(query, params).then((result) => {
        const record = result.records[0].get("p");
        return record;
      });
    },
    Protein: (parent, args, context, info) => {
      let session = context.driver.session(),
        params = { dbId: args.dbId },
        query = `MATCH (ewas:EntityWithAccessionedSequence) WHERE ewas.dbId = $dbId RETURN ewas`;

      return session.run(query, params).then((result) => {
        const record = result.records[0].get("ewas");
        return record;
      });
    },
  },

  // Physical Entity
  PhysicalEntity: physicalEntityResolver,
  Complex: complexResolver,
  Drug: drugResolver,
  GenomeEncodedEntity: genomeEncodedEntityResolver,
  EntityWithAccessionedSequence: entityWithAccessionedSequenceResolver,
  OtherEntity: otherEntityResolver,
  Polymer: polymerResolver,
  SimpleEntity: simpleEntityResolver,
  Set: setResolver,
  Protein: proteinResolver,

  // Event
  Event: eventResolver,
  Pathway: pathwayResolver,
  Reaction: reactionResolver,

  // ReferenceEntity
  ReferenceEntity: referenceEntityResolver,
  ReferenceGeneProduct: referenceGeneProductResolver,
  ReferenceMolecule: referenceMoleculeResolver,
  ReferenceDatabase: referenceDatabaseResolver
};

export default resolvers;
