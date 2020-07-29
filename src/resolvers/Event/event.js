import { dbId, id, dbTypes } from "../common";

const eventProperties = [
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
];

const eventResolver = eventProperties.reduce(
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
    ...eventResolver,
    dbId,
    id,
    dbTypes,
    __resolveType: (obj, context, info) => {
        const schemaClass = obj.properties.schemaClass;
        if (schemaClass === "Pathway") {
            return "Pathway";
        } else {
            return "Reaction";
        }
    },
};
