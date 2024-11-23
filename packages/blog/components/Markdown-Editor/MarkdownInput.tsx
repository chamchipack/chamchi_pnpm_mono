import ClearIcon from '@mui/icons-material/Clear';
import { Autocomplete, Box, Button, Chip, TextField } from '@mui/material';
import { useClientSize } from 'package/src/hooks/useMediaQuery';
import React, { useEffect, useRef, useState } from 'react';
import MarkdownButtonGroup from './MarkdownButtonGroup';
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
  previewImage: string;
  setPreviewImage: React.Dispatch<React.SetStateAction<string>>;
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
  previewImage,
  setPreviewImage,
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

  const handleInsertMarkdown = (markdown: string) => {
    if (['bold', 'strike'].includes(markdown)) return handleBoldClick(markdown);
    setMarkdownText((prev) => prev + markdown);
    textareaRef.current?.focus();
  };

  const handleBoldClick = (markdown: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // 선택된 텍스트를 가져옴
    const selectedText = markdownText.slice(start, end);

    // 선택된 텍스트를 **으로 감싸서 업데이트
    const updatedText =
      markdownText.slice(0, start) +
      (markdown === 'bold' ? `**${selectedText}**` : `~~${selectedText}~~`) +
      markdownText.slice(end);

    setMarkdownText(updatedText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 2, end + 2);
    }, 0);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const maxFileSize = 5 * 1024 * 1024; // 5MB로 제한

    if (file) {
      if (file.size > maxFileSize) {
        alert('파일 크기가 5MB를 초과합니다.');
        return;
      }

      const imageUrl = URL.createObjectURL(file); // 이미지 파일을 URL로 변환\
      setPreviewImage(imageUrl); // 미리보기 URL 설정

      setMarkdownText((prev) => prev + `\n![이미지 설명](${imageUrl})`); // 마크다운에 이미지 추가
    }
  };

  return (
    <Box sx={{ width: isMobile ? '100%' : '50%', overflowY: 'hidden' }}>
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

      <MarkdownButtonGroup
        onInsertMarkdown={handleInsertMarkdown}
        handleImageUpload={handleImageUpload}
      />

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
