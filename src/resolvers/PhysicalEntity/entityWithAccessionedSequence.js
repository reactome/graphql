import { dbId, id, dbTypes } from "../common";

const entityWithAccessionedSequenceProperties = [
    "displayName",
    "name",
    "schemaClass",
    "speciesName",
    "stId",
];

const entityWithAccessionedSequenceResolver = entityWithAccessionedSequenceProperties.reduce((object, propertyName) => {
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

export default {
    ...entityWithAccessionedSequenceResolver,
    dbId,
    id,
    dbTypes,
};
