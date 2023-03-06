import { DocumentNode, QueryHookOptions, TypedDocumentNode, useQuery } from "@apollo/client";

interface QueryProps {
  [key: string]: any;
}

const useCustomQuery = <T, Q extends QueryProps>(
  query: DocumentNode | TypedDocumentNode<T, Q>,
  option: QueryHookOptions,
) => {
  const { data, error, loading } = useQuery<T>(query, option);

  return { data, error, loading };
};
