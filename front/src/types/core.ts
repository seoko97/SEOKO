interface CoreResponse {
  ok: boolean;
  error: any;
}

interface CoreVariables<T> {
  input: T;
}

type CoreResult<QueryName extends string, Input = CoreResponse> = {
  [key in QueryName]: Input;
};

export type { CoreVariables, CoreResponse, CoreResult };
