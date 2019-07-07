export function pickBy(object, predicate = v => v) {
    const obj = {};
    for (const [key, value] of Object.entries(object)) {
        if (predicate(value)) obj[key] = value;
    }
    return obj;
}