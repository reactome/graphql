import { dbId, id, dbTypes } from "./common";

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
  //input: [PhysicalEntity] @relation(name: "input", direction: "OUT")
  //output: [PhysicalEntity] @relation(name: "output", direction: "OUT")
];

const reactionResolver = reactionProperties.reduce((object, propertyName) => {
  object[propertyName] = (obj, args, context, info) => {
    const propertyValue = obj.properties[propertyName];

    const propertyType = JSON.stringify(info.returnType).replace(/"/g, "");
    console.log(propertyName, propertyValue, propertyType);
    if (propertyType === "Int") {
      return propertyValue ? propertyValue.toNumber() : -1;
    } else if (propertyType === "Boolean") {
      return propertyValue || false;
    } else if (propertyType.match(/^\[.*\]$/)) {
      return propertyValue || [];
    } else if (propertyType === "String") {
      return propertyValue;
    }

    // if (propertyType === "Int") {
    //   if (propertyValue) {
    //     return propertyValue ? propertyValue.toNumber() : -1;
    //   } else {
    //     return null;
    //   }
    // } else if (propertyType === "Boolean") {
    //   if (propertyValue) {
    //     return propertyValue;
    //   } else {
    //     return null;
    //   }
    // } else if (propertyType.match(/^\[.*\]$/)) {
    //   return propertyValue || [];
    // } else if (propertyType === "String") {
    //   if (propertyValue) {
    //     return propertyValue;
    //   } else {
    //     return null;
    //   }
    // }
  };
  return object;
}, {});

export default {
  ...reactionResolver,
  dbId,
  id,
  dbTypes,
};
