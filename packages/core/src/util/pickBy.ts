// function pickBy(object, predicate = v => v) {
//   return Object.assign(
//     {}, ...Object
//       .entries(object)
//       .filter(([, v]) => predicate(v))
//       .map(([k, v]) => ({ [k]: v }))
//   );
// }

export function pickBy(object, predicate = v => v) {
    const obj = {};
    for (const [key, value] of Object.entries(object)) {
        if (predicate(value)) obj[key] = value;
    }
    return obj;
}
