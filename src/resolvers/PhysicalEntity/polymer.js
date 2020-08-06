import { dbId, id, dbTypes } from "../common";

const polymerProperties = [
    "displayName",
    "name",
    "schemaClass",
    "speciesName",
    "stId",
];

const polymerResolver = polymerProperties.reduce((object, propertyName) => {
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

const repeatedUnitResolver = (obj, args, context, info) => {
    let session = context.driver.session(),
        params = { dbId: obj.properties.dbId.toNumber() },
        query = `MATCH (p:Polymer)-[:repeatedUnit]->(pe:PhysicalEntity) WHERE p.dbId = $dbId RETURN pe`;

    return session.run(query, params).then((result) => {
        return result.records.map((rec) => {
            const record = rec.get("pe");
            return record;
        });
    });
};

export default {
    ...polymerResolver,
    dbId,
    id,
    dbTypes,
    "repeatedUnit": repeatedUnitResolver
};
