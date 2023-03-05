interface CoreResponse {
  ok: boolean;
  error: any;
}

interface CoreVariants<T> {
  input: T;
}

type CoreResult<QueryName extends string, Input = CoreResponse> = {
  [key in QueryName]: Input;
};

export type { CoreVariants, CoreResponse, CoreResult };
