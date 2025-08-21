'use client';

import { termsData } from '../content';

export default function TermContainer({ _id = '' }) {
  const selected = termsData.find((term) => String(term._id) === String(_id));

  if (!selected) {
    return (
      <div className="px-4">
        <p className="text-sm text-gray-500">해당 약관을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const renderFormattedContent = (content: string) => {
    const sections = content.split(/\n{2,}/);

    return sections.map((section, index) => {
      const trimmed = section.trim();
      const isTitle = /^제\d+조/.test(trimmed);

      return (
        <p
          key={index}
          className={`mb-4 whitespace-pre-line leading-7 ${
            isTitle ? 'font-bold text-base' : 'text-sm'
          }`}
        >
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-2">{selected.title}</h1>
      <p className="text-sm text-gray-500 mb-4">시행일자: {selected.date}</p>
      <hr className="my-4 border-gray-300" />
      {renderFormattedContent(selected.content)}
    </div>
  );
}
