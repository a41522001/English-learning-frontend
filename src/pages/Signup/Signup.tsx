import { useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '@/components/common/TextInput';
import Btn from '@/components/common/Btn';
import { useApi } from '@/hooks/useApi';
import { useDialog } from '@/contexts/DialogContext';
interface User {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const initialUser = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const inputClass = 'py-2 px-3 rounded-md border-slate-300 shadow-sm focus:outline-indigo-500';
const labelClass = 'text-slate-700 text-sm';
const Signup = () => {
  const { apiSignup } = useApi();
  const { showDialog } = useDialog();
  const [user, setUser] = useState<User>(initialUser);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const rules = {
    email: [(value: string) => emailRegex.test(value) || '請輸入正確的信箱格式'],
    password: [(value: string) => value.length >= 6 || '請輸入6位數或以上的密碼'],
    confirmPassword: [(value: string) => value === user.password || '與密碼不相同'],
  };
  const handleUpdateUser = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  const handleValidate = (): boolean => {
    const isHasError = Object.entries(user).some((item) => {
      const [key, value] = item;
      return rules?.[key]?.some((item) => typeof item(value) === 'string');
    });
    return isHasError;
  };
  const handleSignup = async () => {
    const isHasError = handleValidate();
    if (isHasError) {
      return;
    }
    const { confirmPassword, ...userData } = user;
    try {
      const res = await apiSignup(userData);
      if (res.status === 200) {
        showConfirmDialog(res.data.message);
        setUser(initialUser);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const showConfirmDialog = (message: string) => {
    showDialog({
      message: message,
      showCloseBtn: true,
      children: <Btn>關閉</Btn>,
    });
  };
  return (
    <div className="h-screen flex-center px-4">
      <div className="main_container flex rounded-2xl shadow-2xl">
        <div className="bg-indigo-600 grow p-12 rounded-l-2xl text-white font-bold hidden md:block">
          <div className="flex mb-4">
            <h1 className="text-2xl">單字方舟</h1>
          </div>
          <p className="text-3xl mb-2">建立您的新帳號</p>
          <p className="text-indigo-200 flex flex-col font-medium">
            <span>加入我們，開啟一段全新的學習旅程。</span>
            <span className="text-sm">© 2025 Vocab Ark. All rights reserved.</span>
          </p>
        </div>
        <div className="bg-white grow p-8 sm:p-12 rounded-2xl md:rounded-r-2xl flex flex-col">
          <div className="text-2xl font-bold mb-2">建立帳號</div>
          <div className="text-slate-600 mb-8">只需要幾個步驟，即可加入我們。</div>
          <form className="flex flex-col gap-5 mb-8" onSubmit={(e) => e.preventDefault()}>
            <TextInput
              value={user.username}
              onChange={handleUpdateUser}
              type="text"
              id="username"
              name="username"
              label="使用者名稱"
              className={inputClass}
              labelClassName={labelClass}
            />
            <TextInput
              value={user.email}
              onChange={handleUpdateUser}
              type="text"
              id="email"
              name="email"
              label="電子郵件"
              rules={rules.email}
              className={inputClass}
              labelClassName={labelClass}
            />
            <TextInput
              value={user.password}
              onChange={handleUpdateUser}
              type="password"
              id="password"
              name="password"
              rules={rules.password}
              label="密碼"
              className={inputClass}
              labelClassName={labelClass}
              showPasswordEyes={true}
            />
            <TextInput
              value={user.confirmPassword}
              onChange={handleUpdateUser}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              rules={rules.confirmPassword}
              label="確認密碼"
              className={inputClass}
              labelClassName={labelClass}
              showPasswordEyes={true}
            />
            <Btn className="btn_primary_xl mt-1" onClick={handleSignup}>
              建立帳號
            </Btn>
          </form>
          <div className="text-sm flex-center gap-2">
            <span className="text-slate-600">已經有帳號了嗎?</span>
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
              立即登入
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
