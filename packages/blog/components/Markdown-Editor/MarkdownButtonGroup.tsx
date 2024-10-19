import { Box, Button, ButtonGroup } from '@mui/material';
import { kboFont } from "package/styles/fonts/module";

interface MarkdownButtonGroupProps {
  onInsertMarkdown: (markdown: string) => void;
}

export default function MarkdownButtonGroup({
  onInsertMarkdown,
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
        <Button onClick={() => handleButtonClick('bold')}  sx={buttonStyles}>
        굵게
      </Button>
      </ButtonGroup>
    </Box>
  );
}
