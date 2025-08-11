import type { DailyWord, WordExample, SubjectCategory, User } from './index';
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
// 每日單字
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DailyWordResponse extends Response<Omit<DailyWord, 'isOpen' | 'content'>[]> {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WordExampleResponse extends Response<WordExample[]> {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CheckDailyResponse extends Response<{ isDaily: boolean }> {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UserinfoResponse extends Response<User> {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SubjectCategoryResponse extends Response<SubjectCategory[]> {}
