export type ValueOf<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ValueOf
>
  ? ValueOf
  : never;
