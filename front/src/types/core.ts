interface CoreResponse {
  ok: boolean;
  error: any;
}

interface CoreVariants<T> {
  input: T;
}

export type { CoreVariants, CoreResponse };
