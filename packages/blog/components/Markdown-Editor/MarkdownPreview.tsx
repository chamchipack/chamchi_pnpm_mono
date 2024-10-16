'use client';
import { Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { markdownHeaderStyles } from './markdownStyles';
import { useClientSize } from 'package/src/hooks/useMediaQuery';

interface MarkdownPreviewProps {
  title: string;
  markdownText: string;
  readonly?: boolean;
}

export default function MarkdownPreview({
  title,
  markdownText,
  readonly = false,
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
      {/* 제목과 내용 출력 */}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {`# ${title}\n${markdownText}`}
      </ReactMarkdown>
    </Box>
  );
}
