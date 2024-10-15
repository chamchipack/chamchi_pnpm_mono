'use client';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './globals.css'; // 스타일 파일 (선택)

const MarkdownEditor = () => {
  // 입력 필드의 상태를 관리하는 useState 훅
  const [markdownText, setMarkdownText] = useState<string>(
    '## Start editing your markdown!',
  );

  // 입력 필드 변경 시 호출되는 핸들러
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownText(event.target.value);
  };

  return (
    <div className="markdown-editor-container">
      <div className="editor">
        <h2>Markdown Editor</h2>
        {/* 사용자 입력을 위한 textarea */}
        <textarea
          value={markdownText}
          onChange={handleChange}
          placeholder="Write your markdown here..."
          className="textarea"
        />
      </div>
      <div className="preview">
        <h2>Preview</h2>
        {/* 실시간 마크다운 렌더링 */}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdownText}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownEditor;
