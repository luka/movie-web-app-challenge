export function noop() {}

export function findBy(items, itemId, field = "id") {
  const idx = (items || []).findIndex((item) => item[field] === itemId);
  return [items[idx], idx];
}

export function isLast(arr = [], index) {
  return arr.length > 0 && arr.length - 1 === index;
}

export function emptyObj(obj) {
  return Object.keys(obj).length === 0;
}

export function makePagination(total_count, current_page, per_page = 10) {
  const total_pages = Math.ceil(total_count / per_page);
  const next_page = current_page + 1 > total_pages ? null : current_page + 1;
  return {
    current_page,
    next_page,
    total_pages,
    total_count,
    per_page,
  };
}
