type Props = (date: string) => string;
export const dateTimeParser: Props = (date) => {
  const splitDate = date.substring(2, 10).split("-");

  return `${splitDate[0]}년 ${splitDate[1]}월 ${splitDate[2]}일`;
};
