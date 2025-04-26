import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">新規登録</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="メールアドレス"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="パスワード"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="パスワード確認"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 transition rounded-lg p-3 text-white font-semibold"
          >
            登録する
          </button>
        </form>
        <p className="text-white text-sm text-center mt-4">
          すでにアカウントをお持ちですか？{' '}
          <Link to="/login" className="text-blue-400 hover:underline">ログイン</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
