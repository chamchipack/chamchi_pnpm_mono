import { Box, Button, ButtonGroup } from '@mui/material';
import { kboFont } from 'package/styles/fonts/module';
import ImageIcon from '@mui/icons-material/Image';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import CodeIcon from '@mui/icons-material/Code';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import { useClientSize } from 'package/src/hooks/useMediaQuery';

interface MarkdownButtonGroupProps {
  onInsertMarkdown: (markdown: string) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void; // 이미지 업로드 핸들러
}

export default function MarkdownButtonGroup({
  onInsertMarkdown,
  handleImageUpload,
}: MarkdownButtonGroupProps) {
  const isMobile = useClientSize('sm');
  const handleButtonClick = (markdown: string) => {
    onInsertMarkdown(markdown);
  };

  // 공통 스타일 정의
  const buttonStyles = {
    '&:hover': {
      border: (theme: any) => `1px solid ${theme.palette.grey[300]}`,
    },
    border: (theme: any) => `1px solid ${theme.palette.grey[100]}`,
    color: 'gray',
    ...kboFont,
  };

  return (
    <Box sx={{ mb: 2, width: '100%', overflowX: 'auto', whiteSpace: 'nowrap' }}>
      <ButtonGroup variant="outlined" aria-label="markdown button group">
        <Button sx={buttonStyles} onClick={() => handleButtonClick('# ')}>
          h1
        </Button>
        <Button sx={buttonStyles} onClick={() => handleButtonClick('## ')}>
          h2
        </Button>
        <Button sx={buttonStyles} onClick={() => handleButtonClick('### ')}>
          h3
        </Button>
        <Button sx={buttonStyles} onClick={() => handleButtonClick('---\n')}>
          {isMobile ? <HorizontalRuleIcon /> : '구분선'}
        </Button>
        <Button sx={buttonStyles} onClick={() => handleButtonClick('> ')}>
          {isMobile ? <FormatQuoteIcon /> : '인용구'}
        </Button>
        <Button
          sx={buttonStyles}
          onClick={() => handleButtonClick('\n```\n\n```\n')}
        >
          {isMobile ? <CodeIcon /> : '코드블럭'}
        </Button>
        <Button sx={buttonStyles} onClick={() => handleButtonClick('bold')}>
          {isMobile ? <FormatBoldIcon /> : '굵게'}
        </Button>

        <Button sx={buttonStyles} onClick={() => handleButtonClick('strike')}>
          {isMobile ? <StrikethroughSIcon /> : '취소선'}
        </Button>

        {/* 이미지 업로드 버튼 */}
        <input
          accept=".jpg,.jpeg,.png" // JPG와 PNG 파일 형식만 허용
          type="file"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
          id="upload-button"
        />
        <label htmlFor="upload-button">
          <Button sx={buttonStyles} variant="outlined" component="span">
            {isMobile ? <ImageIcon /> : '이미지 업로드'}
          </Button>
        </label>
      </ButtonGroup>
    </Box>
  );
}
