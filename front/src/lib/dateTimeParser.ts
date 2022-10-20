type Props = (date: string) => string;

export const dateTimeParser: Props = (date) => {
  const splitDate = date.substring(0, 10).split("-");

  return `${splitDate[0]}.${splitDate[1]}.${splitDate[2]}`;
};
