import { useState, type ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextInput from '@/components/common/TextInput';
import Btn from '@/components/common/Btn';
import { useApi } from '@/hooks/useApi';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '@/features/authSlice';
import { useDialog } from '@/contexts/DialogContext';

interface User {
  email: string;
  password: string;
}
const initialUser = {
  email: '',
  password: '',
};
const inputClass = 'py-2 px-3 rounded-md border-slate-300 shadow-sm focus:outline-indigo-500';
const labelClass = 'text-slate-700 text-sm';
const Login = () => {
  const { apiLogin } = useApi();
  const { showDialog, hideDialog } = useDialog();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState<User>(initialUser);
  const handleUpdateUser = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  const handleLogin = async () => {
    try {
      const res = await apiLogin(user);
      if (res.status === 200) {
        const { token, message } = res.data;
        console.log(token);
        dispatch(setAccessToken(token));
        showConfirmDialog(message);
      }
    } catch (error) {
      showConfirmDialog(error.response.data.message, true);
    }
  };
  const handleChangePage = () => {
    navigate('/broadcast');
  };

  const closeBtn = (
    <Btn
      className="btn_close"
      onClick={() => {
        handleChangePage();
        hideDialog();
      }}
    >
      關閉
    </Btn>
  );

  const showConfirmDialog = (message: string, isError = false) => {
    showDialog({
      title: message,
      showCloseBtn: true,
      children: isError ? null : closeBtn,
      afterClose: isError ? undefined : handleChangePage,
    });
  };
  return (
    <div className="h-screen flex-center px-4">
      <div className="main_container flex rounded-2xl shadow-2xl">
        <div className="bg-indigo-600 grow p-12 rounded-l-2xl text-white font-bold hidden md:block">
          <div className="flex mb-4">
            <h1 className="text-2xl">單字方舟</h1>
          </div>
          <p className="text-3xl mb-2">歡迎回來！</p>
          <p className="text-indigo-200 flex flex-col font-medium">
            <span>開始今天的學習旅程，探索知識的海洋。</span>
            <span className="text-sm">© 2025 Vocab Ark. All rights reserved.</span>
          </p>
        </div>
        <div className="bg-white grow p-8 sm:p-12 rounded-2xl md:rounded-r-2xl flex flex-col">
          <div className="text-2xl font-bold mb-2">登入您的帳號</div>
          <div className="text-slate-600 mb-8">很高興再次見到您！</div>
          <form className="flex flex-col gap-5 mb-8" onSubmit={(e) => e.preventDefault()}>
            <TextInput
              value={user.email}
              onChange={handleUpdateUser}
              type="text"
              id="email"
              name="email"
              label="電子郵件"
              className={inputClass}
              labelClassName={labelClass}
            />
            <TextInput
              value={user.password}
              onChange={handleUpdateUser}
              type="password"
              id="password"
              name="password"
              label="密碼"
              className={inputClass}
              labelClassName={labelClass}
              showPasswordEyes={true}
            />
            <div className="text-end">
              <a href="#" className="text-indigo-600 hover:text-indigo-500 text-sm">
                忘記密碼?
              </a>
            </div>
            <Btn className="btn_primary_xl mt-1" onClick={handleLogin}>
              登入
            </Btn>
          </form>
          <div className="text-sm flex-center gap-2">
            <span className="text-slate-600">還沒有帳號嗎？</span>
            <Link to="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">
              立即註冊
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
