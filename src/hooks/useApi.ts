import type { HTTPMethod } from '@/types';
import type { SignupRequest, LoginRequest, saveLearnedWordRequest } from '@/types/request';
import type {
  NormalResponse,
  LoginResponse,
  DailyWordResponse,
  WordExampleResponse,
  CheckDailyResponse,
  UserinfoResponse,
  SubjectCategoryResponse,
} from '@/types/response';
import api from '@/utils/api';
import type { AxiosResponse } from 'axios';
import { useLoading } from '@/contexts/LoadingContext';
import { useState } from 'react';

export const useApi = () => {
  const { setLoading } = useLoading();
  const [loadFlag, setLoadingFlag] = useState<boolean>(true);

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
  const sendApi = async <Res, Req>(url: string, method: HTTPMethod, data?: Req, header?: any): Promise<AxiosResponse<Res>> => {
    try {
      if (loadFlag) {
        setLoading(true);
      }
      const response = await api(url, method, data, header);
      if (!response) {
        throw new Error(`${url} has error`);
      } else {
        return response;
      }
    } catch (error) {
      console.error(`${url}: ${error}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 註冊API
  const apiSignup = async (data: SignupRequest): Promise<AxiosResponse<NormalResponse>> => {
    return await sendApi<NormalResponse, SignupRequest>('user/signup', 'post', data);
  };

  // 登入API
  const apiLogin = async (data: LoginRequest): Promise<AxiosResponse<LoginResponse>> => {
    return await sendApi<LoginResponse, LoginRequest>('user/login', 'post', data);
  };

  // 登出API
  const apiLogout = async (): Promise<AxiosResponse<NormalResponse>> => {
    return await sendApi<NormalResponse, null>('user/logout', 'get');
  };

  // 取得使用者資訊API
  const apiGetUserinfo = async (): Promise<AxiosResponse<UserinfoResponse>> => {
    return await sendApi<UserinfoResponse, null>('user/userinfo', 'get');
  };

  // 取得主題類別
  const apiGetSubjectCategory = async (): Promise<AxiosResponse<SubjectCategoryResponse>> => {
    return await sendApi<SubjectCategoryResponse, null>('word/subjectCategory', 'get');
  };
  // 確認是否取得每日單字
  const apiCheckIsDaily = async (): Promise<AxiosResponse<CheckDailyResponse>> => {
    return await sendApi<CheckDailyResponse, null>('word/checkIsDaily', 'get');
  };

  // 取得每日主題單字API
  const apiGetDailyWords = async (subject: string | null): Promise<AxiosResponse<DailyWordResponse>> => {
    return await sendApi<DailyWordResponse, string>(`word/subjectWords?subject=${subject}`, 'get');
  };

  // 取得單字例句
  const apiGetWordExample = async (wordId: string): Promise<AxiosResponse<WordExampleResponse>> => {
    setLoadingFlag(false);
    return await sendApi<WordExampleResponse, string>(`word/wordExample?wordId=${wordId}`, 'get');
  };

  // 儲存已學過單字
  const apiSaveLearnedWord = async (data: saveLearnedWordRequest): Promise<AxiosResponse<NormalResponse>> => {
    setLoadingFlag(false);
    return await sendApi<NormalResponse, saveLearnedWordRequest>('word/saveLearnedWord', 'post', data);
  };

  // 刪除已學過單字
  const apiDeleteLearnedWord = async (wordId: string): Promise<AxiosResponse<NormalResponse>> => {
    setLoadingFlag(false);
    return await sendApi<NormalResponse, null>(`word/learnedWord/${wordId}`, 'delete');
  };

  // 取得已學過單字
  const apiGetLearnedWords = async () => {
    return await sendApi('word/learnedWords', 'get');
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
    apiGetSubjectCategory,
  };
};
