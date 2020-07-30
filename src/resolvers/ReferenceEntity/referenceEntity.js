import { dbId, id, dbTypes } from "../common";

const referenceEntityProperties = [
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

const referenceEntityResolver = referenceEntityProperties.reduce(
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
    ...referenceEntityResolver,
    dbId,
    id,
    dbTypes,
    __resolveType: (obj, context, info) => {
        const schemaClass = obj.properties.schemaClass;
        const referenceEntityClasses = ["ReferenceGeneProduct", "ReferenceMolecule"]
        if (referenceEntityClasses.includes(schemaClass)) {
            return schemaClass;
        }
    },
};
