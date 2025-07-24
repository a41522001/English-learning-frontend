interface Response<T> {
  code: number;
  data: T;
  message: string;
  time: string;
}
export type NormalResponse = Response<null>;
export interface LoginResponse extends Response<null> {
  token: string;
}
