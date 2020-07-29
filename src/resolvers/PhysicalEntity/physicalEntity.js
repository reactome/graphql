import { dbId, id, dbTypes } from "../common";

const physicalEntityProperties = [
  "displayName",
  "name",
  "schemaClass",
  "speciesName",
  "stId",
];

const physicalEntityResolver = physicalEntityProperties.reduce(
  (object, propertyName) => {
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
  },
  {}
);

export default {
  ...physicalEntityResolver,
  dbId,
  id,
  dbTypes,
  __resolveType: (obj, context, info) => {
    const schemaClass = obj.properties.schemaClass;
    if (schemaClass === "DefinedSet" || schemaClass === "CandidateSet") {
      return "Set"; // DefinedSet and CandidateSet in the graph database are represented as Set in the GraphQL interface
    } else {
      return schemaClass; // Other PhysicalEntity types are represented by the same name in the graph database as in the GraphQL interface
    }
  },
};
