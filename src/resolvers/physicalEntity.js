// import { dbId, id, dbTypes } from "./common";

// const physicalEntityProperties = [
//   "definition",
//   "displayName",
//   "endCoordinate",
//   "isChimeric",
//   "isInDisease",
//   "isOrdered",
//   "maxUnitCount",
//   "minUnitCount",
//   "name",
//   "oldStId",
//   "referenceType",
//   "schemaClass",
//   "speciesName",
//   "startCoordinate",
//   "stId",
//   "stIdVersion",
//   "stoichiometryKnown",
//   "systematicName",
// ];

// const physicalEntityResolver = physicalEntityProperties.reduce(
//   (object, propertyName) => {
//     object[propertyName] = (obj, args, context, info) => {
//       const propertyValue = obj.properties[propertyName];

//       const propertyType = JSON.stringify(info.returnType).replace(/"/g, "");
//       console.log(propertyName, propertyValue, propertyType);
//       if (propertyType === "Int") {
//         return propertyValue ? propertyValue.toNumber() : -1;
//       } else if (propertyType === "Boolean") {
//         return propertyValue || false;
//       } else if (propertyType.match(/^\[.*\]$/)) {
//         return propertyValue || [];
//       } else if (propertyType === "String") {
//         return propertyValue;
//       }
//     };
//     return object;
//   },
//   {}
// );

// export default {
//   ...physicalEntityResolver,
//   dbId,
//   id,
//   dbTypes,
// };
