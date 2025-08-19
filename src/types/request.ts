export interface SignupRequest {
  username: string;
  email: string;
  password: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}
export interface saveLearnedWordRequest {
  wordId: string | string[];
}
export interface learnedWordsPageRequest {
  itemPerPage: number;
  page: number;
}
export interface favoriteStatus {
  wordId: string;
  status: boolean;
}
