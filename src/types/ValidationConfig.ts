type ValidationConfig<T> = Record<
  string,
  { validate: (value: any, state: T) => string }
>;

export default ValidationConfig;
