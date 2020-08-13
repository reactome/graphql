import { dbId, id, dbTypes } from "../common";

const setProperties = [
    "displayName",
    "name",
    "schemaClass",
    "speciesName",
    "stId",
];

const setResolver = setProperties.reduce((object, propertyName) => {
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

const hasCandidateResolver = (obj, args, context, info) => {
    let session = context.driver.session(),
        params = { dbId: obj.properties.dbId.toNumber() },
        query = `MATCH (c:CandidateSet)-[:hasCandidate]->(pe:PhysicalEntity) 
        WHERE c.dbId = $dbId 
        RETURN pe`;

    return session.run(query, params).then((result) => {
        return result.records.map((rec) => {
            const record = rec.get("pe");
            return record;
        });
    });
};

const hasMemberResolver = (obj, args, context, info) => {
    let session = context.driver.session(),
        params = { dbId: obj.properties.dbId.toNumber() },
        query = `MATCH (es:EntitySet)-[:hasMember]->(pe:PhysicalEntity) 
        WHERE es.dbId = $dbId 
        RETURN pe`;

    return session.run(query, params).then((result) => {
        return result.records.map((rec) => {
            const record = rec.get("pe");
            return record;
        });
    });
};

export default {
    ...setResolver,
    dbId,
    id,
    dbTypes,
    "candidates": hasCandidateResolver,
    "members": hasMemberResolver
};
