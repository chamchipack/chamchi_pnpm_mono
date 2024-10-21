import { Box, Button, ButtonGroup } from '@mui/material';
import { kboFont } from 'package/styles/fonts/module';

interface MarkdownButtonGroupProps {
  onInsertMarkdown: (markdown: string) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void; // 이미지 업로드 핸들러
}

export default function MarkdownButtonGroup({
  onInsertMarkdown,
  handleImageUpload,
}: MarkdownButtonGroupProps) {
  // 버튼 클릭 시 마크다운 구문을 삽입하는 함수
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
    <Box sx={{ mb: 2 }}>
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
          구분선
        </Button>
        <Button sx={buttonStyles} onClick={() => handleButtonClick('> ')}>
          인용구
        </Button>
        <Button
          sx={buttonStyles}
          onClick={() => handleButtonClick('```\n\n```')}
        >
          코드블럭
        </Button>
        <Button sx={buttonStyles} onClick={() => handleButtonClick('bold')}>
          굵게
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
            이미지 업로드
          </Button>
        </label>
      </ButtonGroup>
    </Box>
  );
}
