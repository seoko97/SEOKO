interface IFet {
  [key: string]: any;
}

export const getDataInput = (data: IFet) => {
  const input: IFet = {};

  Object.keys(data).forEach((key) => {
    if (data[key]) input[key] = data[key];
  });

  return input;
};
