export default function Container() {
  return (
    <div className="h-full bg-gray-50/50 rounded-[2rem] border border-dashed border-gray-200 flex flex-col items-center justify-center">
      <p className="font-bold text-gray-800">출석 처리 화면</p>
      <p className="text-sm text-gray-400">
        학생 명단을 불러와 출석을 체크하세요.
      </p>
    </div>
  );
}
