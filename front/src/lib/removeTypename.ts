interface IProps {
  __typename?: string;
}

export const removeTypename = <T extends IProps>(data?: T | null) => {
  if (!data) return;

  const newData = { ...data };

  if (newData.__typename) delete newData.__typename;

  return newData;
};
