import { dbId, id, dbTypes } from "../common";

const referenceMoleculeProperties = [
    "abbreviation",
    "approvalSource",
    "approved",
    "chain",
    "checksum",
    "comment",
    "databaseName",
    "description",
    "displayName",
    "formula",
    "geneName",
    "inn",
    "identifier",
    "isSequenceChanged",
    "keyword",
    "name",
    "otherIdentifier",
    "schemaClass",
    "secondaryIdentifier",
    "sequenceLength",
    "trivial",
    "type",
    "url",
    "variantIdentifier",
];

const referenceMoleculeResolver = referenceMoleculeProperties.reduce((object, propertyName) => {
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
    ...referenceMoleculeResolver,
    dbId,
    id,
    dbTypes,
};
