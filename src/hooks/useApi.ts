import type { HTTPMethod } from '@/types';
import type { SignupRequest, LoginRequest, saveLearnedWordRequest, learnedWordsPageRequest, favoriteStatus } from '@/types/request';
import type {
  NormalResponse,
  LoginResponse,
  DailyWordResponse,
  WordExampleResponse,
  CheckDailyResponse,
  UserinfoResponse,
  SubjectCategoryResponse,
  LearnedWordResponse,
  LearnedWordCountResponse,
  FavoriteWordCountResponse,
} from '@/types/response';
import api from '@/utils/api';
import type { AxiosError, AxiosResponse } from 'axios';
import { useLoading } from '@/contexts/LoadingContext';
import { useDialog } from '@/contexts/DialogContext';
interface ApiOption {
  headers?: Record<string, string>;
  isThrowError?: boolean; // true = 錯誤交給上層處理
  isSetLoading?: boolean; // true = 自動設定 loading
}

const baseOption: ApiOption = {
  headers: {},
  isThrowError: false,
  isSetLoading: true,
};

export const useApi = () => {
  const { setLoading } = useLoading();
  const { showDialog } = useDialog();
  /**
   * 通用的請求發送器，會直接回傳回應中的 `data` 部分，並妥善處理型別。
   * @template Res - 預期回應中 `data` 的型別。
   * @template Req - 請求主體(body)的型別，預設為 any。
   * @param url - API 的路徑
   * @param method - HTTP 方法 ('get', 'post')
   * @param data - 要發送的請求資料
   * @param header - 自訂的請求標頭
   * @returns {Promise<AxiosResponse<Res>>}一個 Axios回應實例的Promise
   */
  const sendApi = async <Res, Req>(url: string, method: HTTPMethod, data: Req, options: ApiOption = baseOption): Promise<AxiosResponse<Res>> => {
    try {
      if (options.isSetLoading) {
        setLoading(true);
      }
      const response = await api(url, method, data, options.headers);
      if (!response) {
        throw new Error(`${url}錯誤`);
      } else {
        return response;
      }
    } catch (error) {
      console.error(error);
      const { status, response } = error as AxiosError<any>;
      const msg = response?.data.message;
      if ([500, 429].includes(status!)) {
        showDialog({ title: msg, showCloseBtn: true });
      } else if (status === 404) {
        showDialog({ title: '找不到此連結', showCloseBtn: true });
      }
      if (options.isThrowError) {
        throw error;
      } else {
        return null as any;
      }
    } finally {
      setLoading(false);
    }
  };

  // 註冊API
  const apiSignup = async (data: SignupRequest): Promise<AxiosResponse<NormalResponse>> => {
    return await sendApi<NormalResponse, SignupRequest>('user/signup', 'post', data, { isThrowError: true });
  };

  // 登入API
  const apiLogin = async (data: LoginRequest): Promise<AxiosResponse<LoginResponse>> => {
    return await sendApi<LoginResponse, LoginRequest>('user/login', 'post', data, { isThrowError: true });
  };

  // 登出API
  const apiLogout = async (): Promise<AxiosResponse<NormalResponse>> => {
    return await sendApi<NormalResponse, null>('user/logout', 'get', null);
  };

  // 取得使用者資訊API
  const apiGetUserinfo = async (): Promise<AxiosResponse<UserinfoResponse>> => {
    return await sendApi<UserinfoResponse, null>('user/userinfo', 'get', null);
  };

  // 取得主題類別
  const apiGetSubjectCategory = async (): Promise<AxiosResponse<SubjectCategoryResponse>> => {
    return await sendApi<SubjectCategoryResponse, null>('word/subjectCategory', 'get', null);
  };
  // 確認是否取得每日單字
  const apiCheckIsDaily = async (): Promise<AxiosResponse<CheckDailyResponse>> => {
    return await sendApi<CheckDailyResponse, null>('word/checkIsDaily', 'get', null);
  };

  // 取得每日主題單字API
  const apiGetDailyWords = async (subject: string | null): Promise<AxiosResponse<DailyWordResponse>> => {
    return await sendApi<DailyWordResponse, null>(`word/subjectWords?subject=${subject}`, 'get', null);
  };

  // 取得單字例句
  const apiGetWordExample = async (wordId: string): Promise<AxiosResponse<WordExampleResponse>> => {
    return await sendApi<WordExampleResponse, null>(`word/wordExample?wordId=${wordId}`, 'get', null, { isSetLoading: false });
  };

  // 儲存已學過單字
  const apiSaveLearnedWord = async (data: saveLearnedWordRequest): Promise<AxiosResponse<NormalResponse>> => {
    return await sendApi<NormalResponse, saveLearnedWordRequest>('word/saveLearnedWord', 'post', data, { isSetLoading: false });
  };

  // 刪除已學過單字
  const apiDeleteLearnedWord = async (wordId: string): Promise<AxiosResponse<NormalResponse>> => {
    return await sendApi<NormalResponse, null>(`word/learnedWord/${wordId}`, 'delete', null, { isSetLoading: false });
  };

  // 取得已學過單字
  const apiGetLearnedWords = async (): Promise<AxiosResponse<LearnedWordResponse>> => {
    return await sendApi<LearnedWordResponse, null>('word/learnedWords', 'get', null);
  };

  // 取得已學過單字(分頁)
  const apiGetLearnedWordsPage = async ({ itemPerPage, page }: learnedWordsPageRequest): Promise<AxiosResponse<LearnedWordResponse>> => {
    return await sendApi<LearnedWordResponse, null>(`word/learnedWordsPage?itemPerPage=${itemPerPage}&page=${page}`, 'get', null);
  };

  // 取得已學過單字的數量
  const apiGetLearnedWordCount = async (): Promise<AxiosResponse<LearnedWordCountResponse>> => {
    return await sendApi<LearnedWordCountResponse, null>('word/learnedWordCount', 'get', null);
  };

  // 改變我的最愛狀態
  const apiChangeFavorite = async (data: favoriteStatus): Promise<AxiosResponse<NormalResponse>> => {
    return await sendApi<NormalResponse, favoriteStatus>('word/favorite', 'patch', data);
  };

  // 取得我的最愛單字
  const apiGetFavoriteWord = async (): Promise<AxiosResponse<FavoriteWordCountResponse>> => {
    return await sendApi<FavoriteWordCountResponse, null>('word/favoriteWord', 'get', null);
  };

  return {
    apiSignup,
    apiLogin,
    apiLogout,
    apiGetUserinfo,
    apiGetDailyWords,
    apiGetWordExample,
    apiCheckIsDaily,
    apiSaveLearnedWord,
    apiDeleteLearnedWord,
    apiGetLearnedWords,
    apiGetLearnedWordsPage,
    apiGetSubjectCategory,
    apiGetLearnedWordCount,
    apiChangeFavorite,
    apiGetFavoriteWord,
  };
};
