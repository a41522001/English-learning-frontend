import type { HTTPMethod } from '@/types';
import type { SignupRequest, LoginRequest } from '@/types/request';
import type { NormalResponse, LoginResponse } from '@/types/response';
import api from '@/utils/api';
import type { AxiosResponse } from 'axios';
import { useLoading } from '@/contexts/LoadingContext';

export const useApi = () => {
  const { setLoading } = useLoading();

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
      setLoading(true);
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
  // 取得使用者資訊API
  const apiGetUserinfo = async () => {
    return await sendApi('user/userinfo', 'get');
  };
  // 取得每日主題單字API
  const apiGetDailyWords = async (subject: string | null) => {
    return await sendApi(`word/subjectWords?subject=${subject}`, 'get');
  };
  return {
    apiSignup,
    apiLogin,
    apiGetUserinfo,
    apiGetDailyWords,
  };
};
