export function findBy(items, itemId, field = "id") {
  const idx = (items || []).findIndex((item) => item[field] === itemId);
  return [items[idx], idx];
}
