/**
 * Filters array of objects by value with multiple keys
 *
 * @param  {Value}  value: search value
 * @param  {Array} array to filter
 * @return {Array} filtered array
 */
export const filterArray = (value, array) => {
  if (!value) return array;
  const lowSearch = value.toLowerCase();
  return array.filter((row) => {
    return Object.values(row).some((val) => {
      return String(val).toLowerCase().includes(lowSearch);
    });
  });
};
