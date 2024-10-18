'use client';
import { Box, IconButton, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { markdownHeaderStyles } from './markdownStyles';
import { useClientSize } from 'package/src/hooks/useMediaQuery';
import TagDateComponent from './Tag-DateComponent';
import DetailButton from './DetailButton';
import { useEffect, useState } from 'react';
import MarkdownEditorContainer from './MarkdownEditorContainer';
import { Schema } from '@/config/schema';
import DeleteButton from './DeleteButton';
import styles from './container.module.css';

interface MarkdownPreviewProps {
  title: string;
  markdownText: string;
  readonly?: boolean;
  tag?: string[];
  timestamp?: string;
  userId?: string;
  contentId?: string;
  path: Schema;
  isEditon?: boolean;
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
          setEditPage={setEditPage}
          path={path}
        />
      ) : (
        <Box
          className={styles['responsive-container']}
          sx={{
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
            />
            <DetailButton userId={userId} setEditPage={setEditPage} />
          </Box>
          <TagDateComponent tag={tag} timestamp={timestamp} />
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {`# ${title}\n${markdownText}`}
          </ReactMarkdown>
        </Box>
      )}
    </>
  );
}
