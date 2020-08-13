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
import referenceEntityResolver from "./resolvers/ReferenceEntity/referenceEntity";
import referenceGeneProductResolver from "./resolvers/ReferenceEntity/referenceGeneProduct";
import referenceMoleculeResolver from "./resolvers/ReferenceEntity/referenceMolecule";

// ReferenceDatabase
import referenceDatabaseResolver from "./resolvers/ReferenceDatabase/referenceDatabase";

// Catalyst
import catalystResolver from "./resolvers/Catalyst/catalyst";

// Regulation
import regulationResolver from "./resolvers/Regulation/regulation";
import summationResolver from "./resolvers/Regulation/summation";

const resolvers = {
  // Entry points for GraphQL playground 
  // (Reaction, Pathway, Protein)
  Query: {
    Reaction: (parent, args, context, info) => {
      let session = context.driver.session(),
        params = { value: args.valueType === "DB_ID" ? Number(args.value) : args.value, valueType: args.valueType },
        query = getQuery(args.valueType);

      function getQuery(valueType) {
        if (valueType === "DB_ID") {
          return `MATCH (rle:ReactionLikeEvent) 
          WHERE rle.dbId = $value 
          RETURN rle`;

        } else if (valueType === "STABLE_ID") {
          return `MATCH (rle:ReactionLikeEvent) 
          WHERE rle.stId CONTAINS $value 
          RETURN rle`;

        } else if (valueType === "NAME") {
          return `MATCH (rle:ReactionLikeEvent)
            UNWIND rle.name as rleNameList
            WITH rleNameList, rle
            WHERE rleNameList CONTAINS $value
            RETURN rle`;

        } else {
          throw `Please make sure that value entered for ${valueType} is correct`
        }
      };

      return session.run(query, params).then((result) => {
        if (result.records.length === 0) {
          console.log("Please make sure that value entered is correct!");
          /*
            Some function to display custom message in playground
          */
        } else {
          return result.records.map((rec) => {
            const record = rec.get("rle");
            return record;
          })
        }
      });
    },
    Pathway: (parent, args, context, info) => {
      let session = context.driver.session(),
        params = { value: args.valueType === "DB_ID" ? Number(args.value) : args.value, valueType: args.valueType },
        query = getQuery(args.valueType);

      function getQuery(valueType) {
        if (valueType === "DB_ID") {
          return `MATCH (p:Pathway) 
          WHERE p.dbId = $value 
          RETURN p`;

        } else if (valueType === "STABLE_ID") {
          return `MATCH (p:Pathway) 
          WHERE p.stId CONTAINS $value 
          RETURN p`;

        } else if (valueType === "NAME") {
          return `MATCH (p:Pathway)
          UNWIND p.name as pathwayNameList
          WITH pathwayNameList, p
          WHERE pathwayNameList CONTAINS $value
          RETURN p`;

        } else {
          throw `Please make sure that value entered for ${valueType} is correct`
        }
      };

      return session.run(query, params).then((result) => {
        if (result.records.length === 0) {
          console.log("Please make sure that value entered is correct!");
          /*
            Some function to display custom message in playground
          */
        } else {
          return result.records.map((rec) => {
            const record = rec.get("p");
            return record;
          })
        }
      });
    },
    Protein: (parent, args, context, info) => {
      let session = context.driver.session(),
        params = { value: args.valueType === "DB_ID" ? Number(args.value) : args.value, valueType: args.valueType },
        query = getQuery(args.valueType);

      function getQuery(valueType) {
        if (valueType === "DB_ID") {
          return `MATCH (ewas:EntityWithAccessionedSequence) 
          WHERE ewas.dbId = $value 
          RETURN ewas`;

        } else if (valueType === "UNIPROT_IDENTIFIER") {
          return `MATCH (ewas:EntityWithAccessionedSequence)-[:referenceEntity]->(rgp:ReferenceGeneProduct) 
          WHERE rgp.identifier CONTAINS $value 
          RETURN ewas`;

        } else if (valueType === "ENTITY_NAME") {
          return `MATCH (ewas:EntityWithAccessionedSequence) 
          UNWIND ewas.name as ewasNameList 
          WITH ewasNameList, ewas 
          WHERE ewasNameList CONTAINS $value 
          RETURN ewas`;

        } else if (valueType === "GENE_NAME") {
          return `MATCH (ewas:EntityWithAccessionedSequence)-[:referenceEntity]->(rgp:ReferenceGeneProduct)
          UNWIND rgp.geneName as geneNameList
          WITH geneNameList, ewas
          WHERE geneNameList CONTAINS $value
          RETURN ewas`;

        } else {
          throw `Please make sure that value entered for ${valueType} is correct`
        }
      };

      return session.run(query, params).then((result) => {
        if (result.records.length === 0) {
          console.log("Please make sure that value entered is correct!");
          /*
            Some function to display custom message in playground
          */
        } else {
          return result.records.map((rec) => {
            const record = rec.get("ewas");
            return record;
          })
        }
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

  // ReferenceDatabase
  ReferenceDatabase: referenceDatabaseResolver,

  // Catalyst
  Catalyst: catalystResolver,

  // Regulation
  Regulation: regulationResolver,
  Summation: summationResolver,
};

export default resolvers;
