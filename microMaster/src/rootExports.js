let data = {
};

export function getData() {
  return data;
}

export function setData(newData) {
  data = {
    ...data,
    ...newData,
  };
}