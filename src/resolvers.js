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
import catalystResolver from "./resolvers/Event/catalyst";

// ReferenceEntity Interface
import referenceEntityResolver from "./resolvers/ReferenceEntity/referenceEntity";
import referenceGeneProductResolver from "./resolvers/ReferenceEntity/referenceGeneProduct";
import referenceMoleculeResolver from "./resolvers/ReferenceEntity/referenceMolecule";

// ReferenceDatabase
import referenceDatabaseResolver from "./resolvers/ReferenceEntity/referenceDatabase";


const resolvers = {
  // Entry points for GraphQL playground 
  // (Reaction, Pathway, Protein)
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
        params = { value: args.value, valueType: args.valueType },
        query = `MATCH (ewas:EntityWithAccessionedSequence) 
                 WHERE (ewas.valueType = $valueType)
                 AND (ewas.value = $value OR ewas.value CONTAINS $value)
                 RETURN ewas
                `;

      /*
      REFERENCES:

      Cypher CONTAINS operator - https://neo4j.com/docs/cypher-manual/current/clauses/where/#match-string-contains

      Cypher AND, OR operators - https://neo4j.com/docs/cypher-manual/current/clauses/where/#boolean-operations
      */

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
  Catalyst: catalystResolver,

  // ReferenceEntity
  ReferenceEntity: referenceEntityResolver,
  ReferenceGeneProduct: referenceGeneProductResolver,
  ReferenceMolecule: referenceMoleculeResolver,

  // ReferenceDatabase
  ReferenceDatabase: referenceDatabaseResolver,
};

export default resolvers;
