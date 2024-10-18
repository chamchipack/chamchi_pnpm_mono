import ClearIcon from '@mui/icons-material/Clear';
import { Autocomplete, Box, Button, Chip, TextField } from '@mui/material';
import { useClientSize } from 'package/src/hooks/useMediaQuery';
import React, { useEffect, useRef } from 'react';
import ModernSelectBox from './selectbox';
interface MarkdownInputProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  markdownText: string;
  setMarkdownText: React.Dispatch<React.SetStateAction<string>>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function MarkdownInput({
  title,
  setTitle,
  markdownText,
  setMarkdownText,
  tags,
  setTags,
  category,
  setCategory,
}: MarkdownInputProps) {
  const [inputValue, setInputValue] = React.useState<string>('');
  const isMobile = useClientSize('sm');

  const textareaRef = useRef<HTMLTextAreaElement>(null); // Ref 추가

  useEffect(() => {
    if (markdownText) setMarkdownText(markdownText);

    // textarea가 마운트된 이후 높이를 조정
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // 높이 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 텍스트 길이에 맞게 높이 조정
    }
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarkdownText(e.target.value);
  };

  const handleTagsChange = (event: React.SyntheticEvent, newTags: string[]) => {
    if (newTags.length > 5) {
      alert('안돼');
      return; // 태그가 5개 이상일 경우 태그 추가 중지
    }
    setTags(newTags);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ',' && inputValue.trim()) {
      setTags((prevTags) => [...prevTags, inputValue.trim()]);
      setInputValue(''); // 입력 필드 초기화
      event.preventDefault(); // 쉼표 입력 방지
    }
  };

  return (
    <Box sx={{ width: isMobile ? '100%' : '50%' }}>
      {/* 제목 입력 */}
      <TextField
        placeholder="제목을 입력해주세요"
        variant="standard"
        fullWidth
        value={title}
        onChange={handleTitleChange}
        InputProps={{
          disableUnderline: true,
        }}
        sx={{
          minWidth: 500,
          mb: 2,
          border: 'none',
          outline: 'none',
          '& input': {
            fontSize: '1.5rem',
            fontWeight: 500,
          },
        }}
      />

      <ModernSelectBox category={category} setCategory={setCategory} />

      <Box sx={{ height: 40, width: '100%' }}>
        <Autocomplete
          multiple
          freeSolo
          options={[]}
          value={tags}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
          onChange={handleTagsChange}
          renderTags={(value: string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
                sx={{
                  background: (theme) => theme.palette.grey[100],
                  borderColor: (theme) => theme.palette.grey[100],
                  color: 'text.primary',
                  fontWeight: 'bold',
                }}
                deleteIcon={
                  <Button
                    sx={{
                      width: 18, // 버튼의 가로 세로 크기
                      height: 18,
                      minWidth: 0, // 기본 최소 너비를 없애서 동그랗게 만듦
                      background: (theme) => theme.palette.grey[400], // 테두리 추가
                      borderRadius: '50%', // 완전히 동그란 모양
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&: hover': {
                        background: (theme) => theme.palette.grey[600], // 테두리 추가
                      },
                    }}
                  >
                    <ClearIcon
                      sx={{ fontSize: 16, color: 'background.default' }}
                    />{' '}
                  </Button>
                }
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="태그 입력 후 엔터를 눌러보세요"
              variant="standard"
              onKeyDown={handleKeyDown}
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
              }}
              sx={{
                mb: 2,
                minWidth: 500,
              }}
            />
          )}
        />
      </Box>

      {/* 내용 입력 */}
      <TextField
        inputRef={textareaRef}
        multiline
        rows={16}
        variant="outlined"
        placeholder="내용을 입력해보세요"
        fullWidth
        value={markdownText}
        onChange={handleInputChange}
        onInput={(e) => {
          const textarea = e.target as HTMLTextAreaElement;
          textarea.style.height = 'auto'; // 기존 높이 초기화
          textarea.style.height = `${textarea.scrollHeight}px`; // 입력된 내용에 맞춰 높이 조정
        }}
        sx={{
          border: 'none',
          overflow: 'hidden',
          '& textarea': {
            overflow: 'hidden',
          },
          '& fieldset': { border: 'none' },
        }}
      />
    </Box>
  );
}
