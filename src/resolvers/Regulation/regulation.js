import { dbId, id, dbTypes } from "../common";

const regulationProperties = [
    "displayName",
    "stId",
    "schemaClass",
];

const regulationResolver = regulationProperties.reduce((object, propertyName) => {
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

const regulatorResolver = (obj, args, context, info) => {
    let session = context.driver.session(),
        params = { dbId: obj.properties.dbId.toNumber() },
        query = `MATCH (r:Regulation)-[:regulator]->(pe:PhysicalEntity) 
        WHERE r.dbId = $dbId 
        RETURN pe`;

    return session.run(query, params).then((result) => {
        return result.records.map((rec) => {
            const record = rec.get("pe");
            return record;
        });
    });
};

const summationResolver = (obj, args, context, info) => {
    let session = context.driver.session(),
        params = { dbId: obj.properties.dbId.toNumber() },
        query = `MATCH (r:Regulation)-[:regulator]->(s:Summation) 
        WHERE r.dbId = $dbId 
        RETURN s`;

    return session.run(query, params).then((result) => {
        return result.records.map((rec) => {
            const record = rec.get("s");
            return record;
        });
    });
};

export default {
    ...regulationResolver,
    dbId,
    id,
    dbTypes,
    "regulator": regulatorResolver,
    "summation": summationResolver,
};
