'use client';
import { Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { markdownHeaderStyles } from './markdownStyles';
import { useClientSize } from 'package/src/hooks/useMediaQuery';
import TagDateComponent from './Tag-DateComponent';
import DetailButton from './DetailButton';
import { useState } from 'react';
import MarkdownEditorContainer from './MarkdownEditorContainer';

interface MarkdownPreviewProps {
  title: string;
  markdownText: string;
  readonly?: boolean;
  tag?: string[];
  timestamp?: string;
  userId?: string;
  contentId?: string;
}

export default function MarkdownPreview({
  title,
  markdownText,
  readonly = false,
  tag = [],
  timestamp = '',
  userId = '',
  contentId = '',
}: MarkdownPreviewProps) {
  const isMobile = useClientSize('sm');
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
        />
      ) : (
        <Box
          sx={{
            width: isMobile ? '100%' : '50%',
            p: 2,
            textAlign: 'left',
            ...markdownHeaderStyles,
            margin: '0 auto',
          }}
        >
          <DetailButton userId={userId} setEditPage={setEditPage} />
          <TagDateComponent tag={tag} timestamp={timestamp} />
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {`# ${title}\n${markdownText}`}
          </ReactMarkdown>
        </Box>
      )}
    </>
  );
}
