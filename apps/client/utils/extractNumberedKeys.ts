const extractNumberedKeys = (obj: Record<string, unknown>): Record<string, unknown>[] =>
  Object.entries(obj).reduce((result, [key, value]) => {
    const match = key.match(/^(\D+)(\d+)$/);
    if (!match) return result;
    const index = parseInt(match[2], 10);
    const baseKey = match[1];
    result[index] = { ...result[index], [baseKey]: /^\d+$/.test(String(value)) ? parseInt(String(value), 10) : value };
    return result;
  }, []).filter(item => Object.values(item).some(value => value !== undefined && value !== null && value !== ''));

export default extractNumberedKeys;