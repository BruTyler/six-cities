export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getItemById = (array, id) => {
  return array.find((x) => x.id === id);
};

export const replaceItemById = (array, item) => {
  if (array.length === 0) {
    return array;
  }

  const replacedIndex = array.findIndex((x) => x.id === item.id);

  if (replacedIndex !== -1) {
    const newArray = array.slice(0);
    newArray[replacedIndex] = item;
    return newArray;
  } else {
    return array;
  }
};

export const removeItemById = (array, item) => {
  if (array.length === 0) {
    return array;
  }

  return array.filter((x) => x.id !== item.id);
};

const _monthNames = [`January`, `February`, `March`, `April`, `May`, `June`,
  `July`, `August`, `September`, `October`, `November`, `December`];

export const getMonthName = (monthNumber) => _monthNames[monthNumber];

export const getShortDate = (objDate) => {
  let month = objDate.getMonth() + 1;
  if (month < 10) {
    month = `0` + month;
  }
  return `${objDate.getFullYear()}-${month}-${objDate.getDate()}`;
};

export const compare = (a, b, propKey) => {
  if (a[propKey] < b[propKey]) {
    return -1;
  }
  if (a[propKey] > b[propKey]) {
    return 1;
  }
  return 0;
};
