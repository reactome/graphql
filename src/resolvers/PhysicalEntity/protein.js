// "EntityWithAccessionedSequence" is named as "Protein"
// Protein === EntityWithAccessionedSequence

import { dbId, id, dbTypes } from "../common";

const proteinProperties = [
    "definition",
    "displayName",
    "endCoordinate",
    "geneName",
    "isChimeric",
    "isInDisease",
    "isOrdered",
    "maxUnitCount",
    "minUnitCount",
    "name",
    "oldStId",
    "referenceType",
    "schemaClass",
    "speciesName",
    "startCoordinate",
    "stId",
    "stIdVersion",
    "stoichiometryKnown",
    "systematicName",
];

const proteinResolver = proteinProperties.reduce((object, propertyName) => {
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

const referenceEntityResolver = (obj, args, context, info) => {
    let session = context.driver.session(),
        params = { dbId: obj.properties.dbId.toNumber() },
        query = `MATCH (ewas:EntityWithAccessionedSequence)-[:referenceEntity]->(rgp:ReferenceGeneProduct) 
        WHERE ewas.dbId = $dbId 
        RETURN rgp`;

    return session.run(query, params).then((result) => {
        return result.records.map((rec) => {
            const record = rec.get("rgp");
            return record;
        });
    });
};

const setResolver = (obj, args, context, info) => {
    let session = context.driver.session(),
        params = { dbId: obj.properties.dbId.toNumber() },
        query = `MATCH (ewas:EntityWithAccessionedSequence)<-[:hasMember|hasCandidate]-(s:EntitySet)
        WHERE ewas.dbId = $dbId 
        RETURN s`;

    return session.run(query, params).then((result) => {
        return result.records.map((rec) => {
            const record = rec.get("s");
            return record;
        });
    });
};

const complexResolver = (obj, args, context, info) => {
    let session = context.driver.session(),
        params = { dbId: obj.properties.dbId.toNumber() },
        query = `MATCH (ewas:EntityWithAccessionedSequence)<-[:hasComponent]-(c:Complex)
        WHERE ewas.dbId = $dbId 
        RETURN c`;

    return session.run(query, params).then((result) => {
        return result.records.map((rec) => {
            const record = rec.get("c");
            return record;
        });
    });
};

export default {
    ...proteinResolver,
    dbId,
    id,
    dbTypes,
    "referenceEntity": referenceEntityResolver,
    "set": setResolver,
    "complex": complexResolver,
};
