'use client';
import { Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { markdownHeaderStyles } from './markdownStyles';
import { useClientSize } from 'package/src/hooks/useMediaQuery';
import TagDateComponent from './Tag-DateComponent';

interface MarkdownPreviewProps {
  title: string;
  markdownText: string;
  readonly?: boolean;
  tag?: string[];
  timestamp?: string;
}

export default function MarkdownPreview({
  title,
  markdownText,
  readonly = false,
  tag = [],
  timestamp = '',
}: MarkdownPreviewProps) {
  const isMobile = useClientSize('sm');

  return (
    <Box
      sx={{
        width: isMobile || readonly ? '100%' : '50%',
        p: 2,
        textAlign: 'left',
        ...markdownHeaderStyles,
      }}
    >
      <TagDateComponent tag={tag} timestamp={timestamp} />
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {`# ${title}\n${markdownText}`}
      </ReactMarkdown>
    </Box>
  );
}
