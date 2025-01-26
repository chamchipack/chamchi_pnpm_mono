'use client';
import { Schema } from '@/config/schema';
import { Box } from '@mui/material';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import styles from './container.module.css';
import DeleteButton from './DeleteButton';
import DetailButton from './DetailButton';
import MarkdownEditorContainer from './MarkdownEditorContainer';
import { markdownHeaderStyles } from './markdownStyles';
import TagDateComponent from './Tag-DateComponent';

interface MarkdownPreviewProps {
  title: string;
  markdownText: string;
  readonly?: boolean;
  tag?: string[];
  timestamp?: string;
  userId?: string;
  contentId?: string;
  path: string;
  isEditon?: boolean;
  category?: string;
}

export default function MarkdownPreview({
  title,
  markdownText,
  readonly = false,
  tag = [],
  timestamp = '',
  userId = '',
  contentId = '',
  path,
  isEditon = false,
  category = '',
}: MarkdownPreviewProps) {
  const [editPage, setEditPage] = useState(false);

  return (
    <>
      {editPage ? (
        <MarkdownEditorContainer
          contentId={contentId}
          markdown_contents={markdownText}
          markdown_tag={tag}
          markdown_title={title}
          category={category}
          setEditPage={setEditPage}
          path={path}
        />
      ) : (
        <Box
          className={styles['responsive-container']}
          sx={{
            height: '100%',
            padding: 2,
            textAlign: 'left',
            ...markdownHeaderStyles,
            margin: '0 auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              mb: 1,
            }}
          >
            <DeleteButton
              userId={userId}
              path={path}
              id={contentId}
              isEditon={isEditon}
              markdownText={markdownText}
            />
            <DetailButton userId={userId} setEditPage={setEditPage} />
          </Box>
          <TagDateComponent
            tag={tag}
            timestamp={timestamp}
            category={category}
          />
          <ReactMarkdown
            remarkPlugins={[remarkBreaks, remarkGfm]}
            urlTransform={(url, type) => {
              if (type === 'image' && url.startsWith('blob:')) {
                return url;
              }
              return url;
            }}
            components={{
              img: ({ node, ...props }) => (
                <img
                  {...props}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                  }} // 이미지 크기 조절
                  alt={props.alt || '이미지'}
                />
              ),
            }}
          >
            {`# ${title}\n${markdownText}`}
          </ReactMarkdown>
        </Box>
      )}
    </>
  );
}
