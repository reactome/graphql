import { dbId, id, dbTypes } from "../common";

const referenceGeneProductProperties = [
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
    "accessUrl",
];

const referenceGeneProductResolver = referenceGeneProductProperties.reduce((object, propertyName) => {
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

const referenceDatabaseResolver = (obj, args, context, info) => {
    let session = context.driver.session(),
        params = { dbId: obj.properties.dbId.toNumber() },
        query = `MATCH (rgp:ReferenceGeneProduct)-[:referenceDatabase]->(rd:ReferenceDatabase) 
        WHERE rgp.dbId = $dbId 
        RETURN rd`;

    return session.run(query, params).then((result) => {
        return result.records.map((rec) => {
            const record = rec.get("rd");
            return record;
        });
    });
};

export default {
    ...referenceGeneProductResolver,
    dbId,
    id,
    dbTypes,
    "referenceDatabase": referenceDatabaseResolver
};
