'use client';

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, GraduationCap } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      {/* 로그인 카드 컨테이너 */}
      <div className="w-full max-w-[450px] animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* 상단 로고/타이틀 영역 */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 rounded-[1.5rem] text-white mb-4 shadow-xl shadow-slate-200">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            학원 관리 시스템
          </h1>
          <p className="text-sm text-slate-400 font-bold mt-2 uppercase tracking-widest">
            Administrator Login
          </p>
        </div>

        {/* 메인 폼 카드 */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* 이메일/아이디 입력 */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase ml-1 tracking-wider">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="admin@academy.com"
                  className="w-full h-13 pl-12 pr-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none transition-all text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:bg-white focus:border-slate-900/10"
                />
              </div>
            </div>

            {/* 비밀번호 입력 */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[10px] font-black text-slate-300 hover:text-slate-600 transition-colors"
                >
                  비밀번호 찾기
                </button>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full h-13 pl-12 pr-12 bg-slate-50 border-2 border-transparent rounded-2xl outline-none transition-all text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:bg-white focus:border-slate-900/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-slate-100 mt-4"
            >
              <LogIn size={18} />
              로그인하기
            </button>
          </form>
        </div>

        {/* 하단 푸터 보조 텍스트 */}
        <p className="text-center mt-8 text-xs text-slate-400 font-medium">
          계정이 없으신가요?{' '}
          <button className="text-slate-900 font-black hover:underline ml-1">
            관리자 등록 신청
          </button>
        </p>
      </div>

      <style jsx>{`
        .h-13 {
          height: 3.25rem;
        }
      `}</style>
    </div>
  );
}
