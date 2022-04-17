export interface Error {
  message: string;
}

export type BodyResponse<T> =
  | {
      data: T;
    }
  | Error;
