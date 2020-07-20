export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getItemById = (array, id) => {
  return array.find((x) => x.id === id);
};

export const replaceItemById = (array, item) => {
  const newArray = array.slice(0);
  const replacedIndex = newArray.findIndex((x) => x.id === item.id);
  if (replacedIndex !== -1) {
    newArray[replacedIndex] = item;
  }
  return newArray;
};

const monthNames = [`January`, `February`, `March`, `April`, `May`, `June`,
  `July`, `August`, `September`, `October`, `November`, `December`];

export const getMonthName = (monthNumber) => monthNames[monthNumber];

export const getShortDate = (objDate) => {
  let month = objDate.getMonth() + 1;
  if (month < 10) {
    month = `0` + month;
  }
  return `${objDate.getFullYear()}-${month}-${objDate.getDate()}`;
};

export const comparator = (a, b, propKey) => {
  if (a[propKey] < b[propKey]) {
    return -1;
  }
  if (a[propKey] > b[propKey]) {
    return 1;
  }
  return 0;
};
