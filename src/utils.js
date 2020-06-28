export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getItemById = (array, id) => {
  return array.find((x) => x.id === id);
};
