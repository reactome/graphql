import { dbId, id, dbTypes } from "../common";

const reactionProperties = [
  "schemaClass",
  "oldStId",
  "isInDisease",
  "releaseDate",
  "displayName",
  "stId",
  "speciesName",
  "diagramHeight",
  "hasEHLD",
  "stIdVersion",
  "releaseStatus",
  "name",
  "definition",
  "hasDiagram",
  "isInferred",
  "doi",
  "diagramWidth",
  "isChimeric",
  "systematicName",
  //templateEvent: [Event] @relation(name: "templateEvent", direction: "OUT")
  //reverseReaction: [Reaction] @relation(name: "reverseReaction", direction: "BOTH")
  //output: [PhysicalEntity] @relation(name: "output", direction: "OUT")
];

const reactionResolver = reactionProperties.reduce((object, propertyName) => {
  object[propertyName] = (obj, args, context, info) => {
    const propertyValue = obj.properties[propertyName];

    const propertyType = JSON.stringify(info.returnType).replace(/"/g, "");
    if (propertyType === "Int") {
      return propertyValue ? propertyValue.toNumber() : -1;
    } else if (propertyType === "Boolean") {
      return propertyValue || false;
    } else if (propertyType.match(/^\[.*\]$/)) {
      return propertyValue || [];
    } else if (propertyType === "String") {
      return propertyValue;
    } else {
      return propertyValue;
    }
  };
  return object;
}, {});


const inputResolver = (obj, args, context, info) => {
  let session = context.driver.session(),
    params = { dbId: obj.properties.dbId.toNumber() },
    query = `MATCH (rle:ReactionLikeEvent)-[:input]->(pe:PhysicalEntity) WHERE rle.dbId = $dbId RETURN pe`;

  return session.run(query, params).then((result) => {
    return result.records.map((rec) => {
      const record = rec.get("pe");
      return record;
    });
  });
};

const outputResolver = (obj, args, context, info) => {
  let session = context.driver.session(),
    params = { dbId: obj.properties.dbId.toNumber() },
    query = `MATCH (rle:ReactionLikeEvent)-[:output]->(pe:PhysicalEntity) WHERE rle.dbId = $dbId RETURN pe`;

  return session.run(query, params).then((result) => {
    return result.records.map((rec) => {
      const record = rec.get("pe");
      return record;
    });
  });
};

const templateEventResolver = (obj, args, context, info) => {
  let session = context.driver.session(),
    params = { dbId: obj.properties.dbId.toNumber() },
    query = `MATCH (rle:ReactionLikeEvent)-[:templateEvent]->(e:Event) WHERE rle.dbId = $dbId RETURN e`;

  return session.run(query, params).then((result) => {
    return result.records.map((rec) => {
      const record = rec.get("e");
      return record;
    });
  });
};

const reverseReactionResolver = (obj, args, context, info) => {
  let session = context.driver.session(),
    params = { dbId: obj.properties.dbId.toNumber() },
    query = `MATCH (rle:ReactionLikeEvent)-[:reverseReaction]->(r:Reaction) WHERE rle.dbId = $dbId RETURN r`;

  return session.run(query, params).then((result) => {
    return result.records.map((rec) => {
      const record = rec.get("r");
      return record;
    });
  });
};


export default {
  ...reactionResolver,
  dbId,
  id,
  dbTypes,
  "input": inputResolver,
  "output": outputResolver,
  "templateEvent": templateEventResolver,
  "reverseReaction": reverseReactionResolver,
};
