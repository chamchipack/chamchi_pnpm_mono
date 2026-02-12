'use client';

import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-neutral-100">
      <div
        className="
          w-full
          max-w-4xl
          bg-white
          rounded-xl
          shadow-lg
          overflow-hidden
          grid
          grid-cols-1
          md:grid-cols-2
        "
      >
        {/* 🔴 Left: Branding (desktop only) */}
        <div className="hidden md:flex flex-col justify-center px-10 bg-main text-white">
          <h1 className="text-3xl font-semibold mb-4">Welcome Back</h1>
          <p className="text-sm opacity-90 leading-relaxed">
            클래스와 수강생을 한 곳에서 관리하세요. 효율적인 운영을 위한 관리자
            플랫폼입니다.
          </p>
        </div>

        {/* 🔐 Right: Login Form */}
        <div className="px-6 py-10 sm:px-10">
          <h2 className="text-2xl font-semibold mb-2">로그인</h2>
          <p className="text-sm text-gray-500 mb-8">계정 정보를 입력해주세요</p>

          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-sm mb-1 text-gray-600">이메일</label>
              <input
                type="email"
                placeholder="example@email.com"
                className="
                  w-full
                  rounded-md
                  border
                  px-3
                  py-2
                  text-sm
                  focus:outline-none
                  focus:ring-2
                  focus:ring-main
                "
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-600">
                비밀번호
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="
                  w-full
                  rounded-md
                  border
                  px-3
                  py-2
                  text-sm
                  focus:outline-none
                  focus:ring-2
                  focus:ring-main
                "
              />
            </div>

            <button
              type="submit"
              className="
                mt-2
                h-11
                rounded-md
                bg-main
                text-white
                text-sm
                font-medium
                hover:opacity-90
                transition
              "
            >
              로그인
            </button>
          </form>

          {/* <div className="flex justify-between items-center mt-6 text-sm">
            <Link
              href="/forgot-password"
              className="text-gray-500 hover:text-main"
            >
              비밀번호 찾기
            </Link>

            <Link href="/signup" className="text-main font-medium">
              회원가입
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}
