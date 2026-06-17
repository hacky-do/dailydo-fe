export type QueryOptions = Omit<RequestInit, 'method' | 'body'> & {
  method?: 'GET';
  body?: never;
};

export type MutationOptions = Omit<RequestInit, 'method'> & {
  method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
};

export type QueryOptionsWithoutMethod = Omit<QueryOptions, 'method'>;
export type MutationOptionsWithoutMethod = Omit<MutationOptions, 'method'>;
