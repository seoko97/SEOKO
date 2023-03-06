export const checkParams = <T>(value: T) => {
  return value instanceof Array ? value[0] : value;
};
