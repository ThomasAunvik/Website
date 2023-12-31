/**
 * Get the type of the value, that the Promise holds.
 */
export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<
  infer U
>
  ? U
  : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export type PromiseReturnType<T extends (...args: any) => JsPromise<any>> =
  PromiseType<ReturnType<T>>;

export declare type JsPromise<T> = Promise<T> & {};
