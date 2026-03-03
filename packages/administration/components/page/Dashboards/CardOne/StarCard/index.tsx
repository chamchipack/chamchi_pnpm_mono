import React from 'react';

interface Props {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
}

export default function StatCard({ title, value, icon, color, bg }: Props) {
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-4 transition-transform hover:scale-[1.02]">
      <div className={`p-4 rounded-2xl ${bg} ${color}`}>{icon}</div>
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
          {title}
        </p>
        <p className="text-2xl font-black text-slate-900 leading-none mt-1">
          {value}
        </p>
      </div>
    </div>
  );
}
