export function searchKeyword<T extends object>(
  obj: T,
  keyword: string,
  keys: Array<keyof T>,
  caseSensitive?: boolean,
) {
  for (const [curr, currElem] of Object.entries(obj)) {
    if (keys.find((el) => el === curr)) {
      if (
        (caseSensitive ? currElem : currElem.toLowerCase()).includes(
          caseSensitive ? keyword : keyword.toLowerCase(),
        )
      ) {
        return true;
      }
    }
  }
  return false;
}
