export type HTTPMethod =
  | 'get'
  | 'GET'
  | 'Get'
  | 'post'
  | 'POST'
  | 'Post'
  | 'delete'
  | 'DELETE'
  | 'Delete'
  | 'put'
  | 'PUT'
  | 'Put'
  | 'patch'
  | 'PATCH'
  | 'Patch';
// user資訊
export interface User {
  username: string;
  email: string;
  id: string;
  created_at: Date;
}
// 主題類別
export interface SubjectCategory {
  bgColor: string;
  hoverColor: string;
  iconColor: string;
  content: string;
  icon: string;
  subject: string;
  title: string;
}
// 每日單字
export interface DailyWord {
  id: string;
  word: string;
  pronunciation: string;
  category: string;
  categoryName: string;
  learned: boolean;
  isOpen: boolean;
  content: any[];
}
// 單字例句
export interface WordExample {
  exampleSentenceEn: string;
  exampleSentenceZn: string;
  meanZh: string;
  partOfSpeech: string;
}
// 已學過單字
export interface LearnedWord {
  wordId: string;
  learnAt: Date;
  word: string;
  pronunciation?: string;
  category: string;
  categoryName: string;
  favorite: boolean;
}
// 徽章顏色
export interface BadgeColor {
  bgColorClass: string;
  textColorClass: string;
}
// 複習卡片
export interface ReviewCardType {
  category: string;
  categoryName: string;
  learnAt: string;
  word: string;
  wordExamples: WordExample[];
}
