'use client';

import { useSmartNavigation } from '@/config/navigation';
import { ArrowRight } from 'lucide-react';
import { termsData } from '../content';

interface Props {
  type: string;
}

export default function TermsContainer({ type }: Props) {
  const smartNavigate = useSmartNavigation();

  const handleRouter = (_id: number) => {
    const path = `policy/policy-detail`;
    const params = { type, _id };

    smartNavigate({ path, status: 'forward', params });
  };

  return (
    <div className="flex flex-col gap-3">
      {termsData.map(({ _id, title, date }) => (
        <div
          key={_id}
          onClick={() => handleRouter(_id)}
          className="flex justify-between items-center px-4 py-3 rounded-lg bg-gray-200 cursor-pointer hover:bg-gray-300 transition"
        >
          <div>
            <p className="text-base font-semibold">{title}</p>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-600" />
        </div>
      ))}
    </div>
  );
}
