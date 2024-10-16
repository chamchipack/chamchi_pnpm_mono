import { Box, Divider, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import MarkdownPreview from './MarkdownPreview';
import MarkdownInput from './MarkdownInput';
import SettingButton from './SettingButton';
import { useClientSize } from 'package/src/hooks/useMediaQuery';
import ModalWrapper from 'package/src/Modal/ModalWrapper';

export default function MarkdownEditorContainer() {
  const isMobile = useClientSize('sm');

  const [title, setTitle] = useState<string>('');
  const [markdownText, setMarkdownText] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [preview, setPreview] = useState(false);

  const onClickSave = async () => {
    console.info(title);
    console.info(markdownText);
    console.info(tags);
  };

  return (
    <>
      <SettingButton setPreview={setPreview} onClickSave={onClickSave} />

      <Box
        sx={{
          display: 'flex',
          height: 'calc(85vh)',
          py: 2,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {/* 마크다운 결과 */}
        {!isMobile && (
          <>
            <MarkdownPreview title={title} markdownText={markdownText} />
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                position: 'sticky',
                top: 0,
                height: 'auto', // 컨텐츠에 맞게 높이를 자동으로 설정
                alignSelf: 'stretch', //
                mr: 3,
              }}
            />
          </>
        )}

        {/* 입력하는 컴포넌트 */}
        <MarkdownInput
          title={title}
          setTitle={setTitle}
          markdownText={markdownText}
          setMarkdownText={setMarkdownText}
          tags={tags}
          setTags={setTags}
        />
      </Box>

      <ModalWrapper open={preview} onClose={() => setPreview(false)}>
        <>
          {isMobile && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                height: '70vh', // 모달 창의 고정 높이 설정 (뷰포트의 70%)
                bgcolor: 'background.default',
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
                overflowY: 'auto', // 콘텐츠가 넘칠 경우 스크롤
              }}
            >
              <MarkdownPreview title={title} markdownText={markdownText} />
            </Box>
          )}
        </>
      </ModalWrapper>
    </>
  );
}
