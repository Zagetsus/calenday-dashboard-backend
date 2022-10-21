export const capitalizeFirstLetter = ([first, ...rest] = '') =>
  first.toLocaleUpperCase() + rest.join('');
