import React, { useState } from 'react';
import Loading from '../components/Loading';

export default function Login() {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // 模拟登录请求
    setTimeout(() => {
      setLoading(false);
      // 登录成功跳转或显示内容
      alert('ログイン成功！');
    }, 2000);
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">ログイン</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="メールアドレス" className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white" />
          <input type="password" placeholder="パスワード" className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white" />
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 rounded-lg p-3 text-white font-semibold">
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}
