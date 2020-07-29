// WARNING: For extremly large integer values, the following approach may be needed
// https://stackoverflow.com/questions/42645342/neo4j-return-an-integer-instead-of-high-0-low-10
export function dbId(obj, args, context, info) {
    return obj.properties.dbId.toNumber();
}

export function id(obj, args, context, info) {
    return obj.identity.toNumber();
}

export function dbTypes(obj, args, context, info) {
    return obj.labels;
}
