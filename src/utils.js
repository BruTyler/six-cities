export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getItemById = (array, id) => {
  return array.find((x) => x.id === id);
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
