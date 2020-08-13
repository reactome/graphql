import { dbId, id, dbTypes } from "../common";

const pathwayProperties = [
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

const pathwayResolver = pathwayProperties.reduce((object, propertyName) => {
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

const hasEventResolver = (obj, args, context, info) => {
    let session = context.driver.session(),
        params = { dbId: obj.properties.dbId.toNumber() },
        query = `MATCH (p:Pathway)-[:hasEvent]->(e:Event) 
        WHERE p.dbId = $dbId 
        RETURN e`;

    return session.run(query, params).then((result) => {
        return result.records.map((rec) => {
            const record = rec.get("e");
            return record;
        });
    });
};

export default {
    ...pathwayResolver,
    dbId,
    id,
    dbTypes,
    "hasEvent": hasEventResolver,
};
