export const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const filterObjectArray = (array, key, value) => {
  array.filter(object => {
    const id = Object.keys(object)[0];
    return object[id][key] == value;
  });
};
