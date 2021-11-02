/**
 * Returns a clone, removing all Solid reactivity.
 *
 * @param object
 */
export const clone = <T>(object: T): T => JSON.parse(JSON.stringify(object));
