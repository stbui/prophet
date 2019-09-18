export function pickBy(object, predicate = (v, k) => v) {
    const obj = {};
    for (const [key, value] of Object.entries(object)) {
        if (predicate(value, key)) obj[key] = value;
    }
    return obj;
}
