export type ResolveFn<T extends (props?: unknown) => void> = T extends (
    ...args: unknown[]
) => infer R
    ? (...args: Parameters<T>) => R
    : never
