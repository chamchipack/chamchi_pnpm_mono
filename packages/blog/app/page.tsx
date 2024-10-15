'use client';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './globals.css';

const MarkdownEditor = () => {
  const [markdownText, setMarkdownText] = useState<string>(
    '## Start editing your markdown!\n\n```javascript\nconsole.log("Hello, world!");\n```',
  );

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownText(event.target.value);
  };

  return (
    <div className="markdown-editor-container">
      <div className="editor">
        <h2>Markdown Editor</h2>
        <textarea
          value={markdownText}
          onChange={handleChange}
          placeholder="Write your markdown here..."
          className="textarea"
        />
      </div>
      <div className="preview">
        <h2>Preview</h2>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={dark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {markdownText}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownEditor;
